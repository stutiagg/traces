import "./Map.css"
import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
function TripMap({ trips, selected }){

    const positions = selected.visits
  .filter(                              //filters out visits with invalid entries
    visit =>
      visit.location.lat &&
      visit.location.lon
  )
  .map((visit) => [                     //actual mapping of the visits 
    visit.location.lat,
    visit.location.lon
  ]);

     function MarkerRender(){
        const MapMarkers = selected.visits.map((visit) => {
  
            return (
            <>
            <Marker key={visit.id} position={[visit.location.lat, visit.location.lon]}>
                <Popup>
                    {visit.location.name}
                </Popup>
            </ Marker>
            </>
            )
        })
        
        return MapMarkers
    }

    return (
          <div id="map">
          <MapContainer center={[36, 138]} zoom={3} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[lat, lon]}>
              <Popup>
                 {name}
              </Popup>
            </Marker> */}

            <Polyline positions={positions} dashArray="10,10"/>

          <MarkerRender />
          </MapContainer>
        </div>
    )
}

export default TripMap