import "./Map.css"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, CircleMarker } from 'react-leaflet'
import API from './api';
import { useState, useEffect, useMemo } from "react";

function Map(){

const [mapData, setMapData] = useState([]);
const [mapStatus, setMapStatus] = useState("loading");
const [mapError, setMapError] = useState("");
const [retryCount, setRetryCount] = useState(0);

async function getMap(signal){
  try{
    const token = localStorage.getItem("token");
    const response = await API.get('/map', {
      signal,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (signal.aborted) return;

    setMapData(response.data);
    setMapStatus(response.data.length === 0 ? "empty" : "success");
  } catch (err) {
    if (err.code !== "ERR_CANCELED") {
      console.log(err.response?.data);
      setMapError("Unable to load the map. Please try again.");
      setMapStatus("error");
    }
  }
}

function retryMap() {
  setMapStatus("loading");
  setMapError("");
  setRetryCount((count) => count + 1);
}

useEffect(() => {
    const controller = new AbortController();
    void getMap(controller.signal);

    return () => controller.abort();
}, [retryCount]);

const grouped = useMemo(() => {
    const grouped = {};

    for (const visit of mapData) {
        if (!grouped[visit.trip_id]) {
            grouped[visit.trip_id] = [];
        }

        grouped[visit.trip_id].push([
            visit.latitude,
            visit.longitude
        ]);
    }

    return grouped;
}, [mapData]);

const allPositions = mapData.map(visit => [
    visit.latitude,
    visit.longitude
]);


function PolylineRender() {
    return Object.values(grouped).map((positions, index) => (
        <Polyline
            key={index}
            positions={positions}
            dashArray="10,10"
        />
    ));
}

  function MarkerRender(){
    const MapMarkers = mapData.map((data) => {
            return (
            <Marker key={data.id} position={[data.latitude, data.longitude]}>
                <Popup>
                    {data.name}
                </Popup>
            </ Marker>
            ) 
        })
        return MapMarkers
    }
    function FitBounds({ positions }) {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 0) {
            map.fitBounds(positions, {
                padding: [50, 50]
            });
        }
    }, [map, positions]);

    return null;
}

    return (
          <div id="map">
          {mapStatus === "loading" && (
            <div className="map-data-state" role="status">Loading map...</div>
          )}
          {mapStatus === "error" && (
            <div className="map-data-state map-data-error" role="alert">
              <p>{mapError}</p>
              <button type="button" onClick={retryMap}>Try again</button>
            </div>
          )}
          {mapStatus === "empty" && (
            <div className="map-data-state" role="status">No mapped visits yet.</div>
          )}
          {mapStatus === "success" && (
          <MapContainer zoom={0.95} center={[35,0]} scrollWheelZoom={false}>
          {allPositions && <FitBounds positions = {allPositions} />}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <PolylineRender />
            <MarkerRender />
          </MapContainer>
          )}
        </div>
    )
}

export default Map

// TODO:
// Modify backend to return map-specific data.
// Connect frontend to the new endpoint and render markers/polylines.