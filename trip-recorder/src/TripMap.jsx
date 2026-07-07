import "./Map.css"
import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
function TripMap({ visits }){

    const positions = visits
  .filter(                              //filters out visits with invalid entries
    visit =>
      visit.latitude &&
      visit.longitude
  )
  .map((visit) => [                     //actual mapping of the visits 
    visit.latitude,
    visit.longitude
  ]);

    //  function MarkerRender(){
    //     const MapMarkers = visits.map((visit) => {
  
    //         return (
    //         <>
    //         <Marker key={visit.id} position={[visit.latitude, visit.longitude]}>
    //             <Popup>
    //                 {visit.name}
    //             </Popup>
    //         </ Marker>
    //         </>
    //         )
    //     })
        
    //     return MapMarkers
    // }

    function MarkerRender() {
  return visits
    .filter(
      (visit) =>
        visit.latitude != null &&
        visit.longitude != null
    )
    .map((visit) => (
      <Marker
        key={visit.id}
        position={[visit.latitude, visit.longitude]}
      >
        <Popup>{visit.name}</Popup>
      </Marker>
    ));
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