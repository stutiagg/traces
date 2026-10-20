import Map from '../Map'
import TripGallery from '../TripGallery'
import { CalendarDays, Compass, MapPin, Plane, Plus, Quote } from "lucide-react";
import { useMemo, useState } from "react";
import './Home.css'

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function getDaysTravelled(trips) {
  const ranges = trips
    .map(({ start_date, end_date }) => {
      if (
        typeof start_date !== "string" ||
        typeof end_date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(start_date) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(end_date)
      ) {
        return null;
      }

      const start = Date.parse(`${start_date}T00:00:00Z`);
      const end = Date.parse(`${end_date}T00:00:00Z`);

      if (
        !Number.isFinite(start) ||
        !Number.isFinite(end) ||
        new Date(start).toISOString().slice(0, 10) !== start_date ||
        new Date(end).toISOString().slice(0, 10) !== end_date ||
        end < start
      ) {
        return null;
      }

      return { start, end };
    })
    .filter(Boolean)
    .sort((a, b) => a.start - b.start);

  let totalDays = 0;
  let currentRange = null;

  for (const range of ranges) {
    if (!currentRange) {
      currentRange = { ...range };
      continue;
    }

    if (range.start <= currentRange.end + DAY_IN_MILLISECONDS) {
      currentRange.end = Math.max(currentRange.end, range.end);
      continue;
    }

    totalDays += (currentRange.end - currentRange.start) / DAY_IN_MILLISECONDS + 1;
    currentRange = { ...range };
  }

  if (currentRange) {
    totalDays += (currentRange.end - currentRange.start) / DAY_IN_MILLISECONDS + 1;
  }

  return totalDays;
}

function Home({
  trips,
  setTrips,
  setCreateMode,
  setEditingTrip,
  tripStatus,
  tripError,
  onRetryTrips,
}) {
  const [mapVisits, setMapVisits] = useState(null);
  const uniqueLocations = useMemo(() => {
    if (!mapVisits) return null;
    return new Set(
      mapVisits
        .map((visit) => visit.name?.trim().toLocaleLowerCase())
        .filter(Boolean)
    ).size;
  }, [mapVisits]);
  const daysTravelled = useMemo(() => getDaysTravelled(trips), [trips]);
  const tripsLoaded = tripStatus === "success";

return(
<>
      <div className="home-map-layout">
        <Map onVisitsLoaded={setMapVisits} />
        <aside className="journey-overview" aria-labelledby="journey-overview-heading">
            <div className="journey-overview-header">
              <div>
                <h2 id="journey-overview-heading">YOUR JOURNEY</h2>
                <p>Your travels, at a glance</p>
              </div>
              <Compass aria-hidden="true" />
            </div>
            <div className="journey-metrics">
              <div className="journey-metric">
                <Plane aria-hidden="true" />
                <div className="journey-metric-copy">
                  <strong>{tripsLoaded ? trips.length : "—"}</strong>
                  <span>Total Trips</span>
                </div>
              </div>
              <div className="journey-metric">
                <MapPin aria-hidden="true" />
                <div className="journey-metric-copy">
                  <strong>{uniqueLocations ?? "—"}</strong>
                  <span>Unique Locations</span>
                </div>
              </div>
              <div className="journey-metric">
                <CalendarDays aria-hidden="true" />
                <div className="journey-metric-copy">
                  <strong>{tripsLoaded ? daysTravelled : "—"}</strong>
                  <span>Days Travelled</span>
                </div>
              </div>
            </div>
            <div className="journey-quote">
              <Quote aria-hidden="true" />
              <p>Collect moments, connect places.</p>
            </div>
        </aside>
      </div>
      {tripStatus === "loading" && (
        <p className="trip-data-state" role="status">Loading trips...</p>
      )}
      {tripStatus === "error" && (
        <div className="trip-data-state trip-data-error" role="alert">
          <p>{tripError}</p>
          <button type="button" onClick={onRetryTrips}>Try again</button>
        </div>
      )}
      {tripStatus === "success" && (
        <TripGallery trips={trips} setTrips={setTrips} setCreateMode={setCreateMode} setEditingTrip={setEditingTrip}/>
      )}
      
      <div className="add-trip-wrapper">
    <button
        className="add-trip-btn"
        onClick={() => setCreateMode("create")}
    >
        <Plus size={24} strokeWidth={2.5} />
    </button>
   </div>
</>

)};

export default Home;