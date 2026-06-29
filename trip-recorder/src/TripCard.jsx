
import { EllipsisVertical } from 'lucide-react'
import './TripCard.css'
import TripActionsMenu from './TripActionsMenu'
import { useState } from 'react'
function TripCard({trip, onClick, trips, setTrips, setCreateMode, setEditingTrip}){

    
    const [displayActionMenu, setDisplayActionMenu] = useState(false);

    return(
        <div className="trip-card" onClick={onClick}>
            <img src= { trip.cover } />
            <EllipsisVertical className='trip-ellipsis' onClick={(e)=> {e.stopPropagation(); 
                setDisplayActionMenu(prev => !prev);
                }}/>
            {displayActionMenu && (<TripActionsMenu trip={trip} trips={trips} setTrips={setTrips} setEditingTrip={setEditingTrip} setCreateMode={setCreateMode}/>)}
            <div className="trip-details">
            <h2 className="trip-name">{trip.name}</h2>
            <p className="trip-date">{trip.start} - {trip.end}</p>
            </div>
        </div>
    )
}

export default TripCard