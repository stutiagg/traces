import TripCard from './TripCard'
import './TripGallery.css'

function TripGallery({trips, setSelected}){

    function handleCardClick(trip){
        setSelected(trip);
    }

    function TripCardRender(){
    const tripCardArray = trips.map((trip) => 
    {return <TripCard trip = {trip} onClick = {() => handleCardClick(trip)} />})

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