import "./Map.css"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import API from './api';
import { useState, useEffect, useMemo } from "react";

function Map(){

const [mapData, setMapData] = useState([]);

async function getMap(){
  try{
    const token = localStorage.getItem("token");
    const response = await API.get('/map', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setMapData(response.data);
  } catch (err) {
    console.log(err.response?.data);
  }
}


useEffect(() => {
    getMap();
}, []);

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
          <MapContainer zoom={1.5} scrollWheelZoom={false}>
          <FitBounds positions = {allPositions} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <PolylineRender />
            <MarkerRender />
          </MapContainer>
        </div>
    )
}

export default Map

// TODO:
// Modify backend to return map-specific data.
// Connect frontend to the new endpoint and render markers/polylines.