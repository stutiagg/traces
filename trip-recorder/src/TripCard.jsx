import pic from './assets/picture1.jpg'
import './TripCard.css'
function TripCard({trip}){


    return(
        <div className="trip-card">
            <img src= { trip.cover } />
            <div className="trip-details">
            <h2 className="trip-name">{trip.name}</h2>
            <p className="trip-date">{trip.start} - {trip.end}</p>
            {/* <div className="trip-stats">
            <span className="loc-num">5 Locations</span>
            <span className="mem-num">42 Memories</span>
            </div> */}
            </div>
        </div>

    )
}

export default TripCard