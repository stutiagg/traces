import TripCard from './TripCard'
import './TripGallery.css'

function TripGallery({trips, setSelected, setTrips, setCreateMode, setEditingTrip}){

    function handleCardClick(trip){
        setSelected(trip);
    }

    function TripCardRender(){
    const tripCardArray = trips.map((trip) => 
    {return <TripCard key = {trip.id} trip = {trip} trips={trips} setTrips={setTrips} setCreateMode={setCreateMode} setEditingTrip={setEditingTrip} onClick = {() => handleCardClick(trip)} />})

    return tripCardArray
}

    return(
        <div>
          <h3 className='recent-trips'>Recent Trips</h3>
          <div className="carousel">
                <div className="trip-gallery">
                    <TripCardRender />
                    
                </div>
                <div className="overlay"></div>
          </div>
        </div>
    )
}

export default TripGallery