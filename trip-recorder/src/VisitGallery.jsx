import './VisitGallery.css'
import VisitCard from './VisitCard'
import { useEffect, useState } from 'react';
import TripMap from './TripMap';
import { useParams } from 'react-router-dom';
import API from './api';

function VisitGallery({ setSelected, trips, setTrips }){

    const { id } = useParams();

    const selected = trips.find(
    (trip) => trip.id.toString() === id
    );

    const [visits, setVisits] = useState([]);
    const [visitStatus, setVisitStatus] = useState("loading");
    const [visitError, setVisitError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
  const controller = new AbortController();
  async function fetchVisits() {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/trips/${id}/visits`,
        {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (controller.signal.aborted) return;

      setVisits(response.data);
      setVisitStatus("success");
    } catch (err) {
      if (err.code !== "ERR_CANCELED") {
        console.log(err.response?.data);
        setVisitError("Unable to load visits. Please try again.");
        setVisitStatus("error");
      }
    }
  }

  void fetchVisits();

  return () => controller.abort();
}, [id, retryCount]);
    
const [editingVisitId, setEditingVisitId] = useState(null);

    if (!selected) {
        return <h2>Trip not found.</h2>;
    }

    function handleAddVisit(){
        
        const newVisit = {
            id: Date.now(),
            name:"",
            cover:"",
            date:null,
            latitude:"",
            longitude:"",
            temp: true
        }

        setEditingVisitId(newVisit.id);

        setVisits((prev) => [...prev, newVisit]);
    }

    function retryVisits() {
        setVisitError("");
        setVisitStatus("loading");
        setRetryCount((count) => count + 1);
    }

    // function MapRender(){
    //     const MapMarkers = selected.visits.map((visit) => {
    //         return <TripMap name={visit.location.name} lat={visit.location.lat} lon={visit.location.lon}/>
    //     })
        
    //     return MapMarkers
    // }

    return(
        <div className='visit-gallery-wrapper'>
        <div className='visit-gallery'>
            <div className='visit-gallery-header'>
            <h2>Visit Gallery</h2>
            <button className='add-visit-btn' onClick={handleAddVisit} disabled={visitStatus !== "success"}>Add Visit</button>
            </div>
            <div className='divider'></div>
        {visitStatus === "loading" && (
            <p role="status">Loading visits...</p>
        )}
        {visitStatus === "error" && (
            <div role="alert">
                <p>{visitError}</p>
                <button type="button" onClick={retryVisits}>Try again</button>
            </div>
        )}
        {visitStatus === "success" && visits.length === 0 && (
            <p>No visits yet. Add a visit to start your journey.</p>
        )}
        {visits.map((visit)=>(
        <VisitCard
        key = {visit.id}
        visit = {visit}
        trips={trips}
        setTrips={setTrips}
        setSelected={setSelected}
        editingVisitId={editingVisitId}
        setEditingVisitId={setEditingVisitId}

        setVisits={setVisits}/>
    ))}
        </div>
        <aside className="side-map" aria-hidden={false}>
            <div className="map-inner">
                <TripMap visits={visits}/>
            </div>
        </aside>
        </div>
    )
}

export default VisitGallery