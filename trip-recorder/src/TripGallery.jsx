import TripCard from './TripCard'
import './TripGallery.css'
import { useNavigate } from "react-router-dom";

function TripGallery({trips, setTrips, setCreateMode, setEditingTrip}){

    const navigate = useNavigate();

    function handleCardClick(trip){
        navigate(`/trips/${trip.id}`);
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