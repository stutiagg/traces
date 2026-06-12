import "./Map.css"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
function Map({trips}){

function PolylineRender(){
  const Polylines = trips.map((trip)=>{
      const positions = trip.visits
      .filter(                              //filters out visits with invalid entries
        visit =>
          visit.location.lat &&
          visit.location.lon
      )
      .map((visit) => [                     //actual mapping of the visits 
        visit.location.lat,
        visit.location.lon
  ]);

  return <Polyline positions={positions} dashArray="10,10" />
  })
  return Polylines
}

  

  function MarkerRender(){
    const MapMarkers = trips.map((trip) => {
      const TripMarkers = trip.visits.map((visit) => {
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
        return TripMarkers
    }
    )  
        return MapMarkers
    }

    return (
          <div id="map">
          <MapContainer center={[0, 0]} zoom={1.5} scrollWheelZoom={false}>
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