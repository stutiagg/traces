
import { EllipsisVertical } from 'lucide-react'
import './TripCard.css'
import TripActionsMenu from './TripActionsMenu'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function TripCard({trip, trips, setTrips, setCreateMode, setEditingTrip}){

    
    const [displayActionMenu, setDisplayActionMenu] = useState(false);

    return(
        <article className="trip-card">
            <Link className="trip-card-link" to={`/trips/${trip.id}`}>
            <img
                src={trip.cover_url}
                alt={trip.name ? `Cover photo for ${trip.name}` : "Trip cover photo"}
            />
            <div className="trip-details">
                <h2 className="trip-name">{trip.name}</h2>
                <p className="trip-date">
                    {new Date(trip.start_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })} - {new Date(trip.end_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
            </div>
            </Link>
            <button
                className="trip-ellipsis"
                type="button"
                aria-label={`Actions for ${trip.name || "this trip"}`}
                aria-expanded={displayActionMenu}
                onClick={() => setDisplayActionMenu(prev => !prev)}
            >
                <EllipsisVertical aria-hidden="true" />
            </button>
            {displayActionMenu && (<TripActionsMenu trip={trip} trips={trips} setTrips={setTrips} setEditingTrip={setEditingTrip} setCreateMode={setCreateMode}/>)}
        </article>
    )
}

export default TripCard