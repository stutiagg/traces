import './VisitGallery.css'
import VisitCard from './VisitCard'
import { useState } from 'react';
import TripMap from './TripMap';
function VisitGallery({ selected, setSelected, trips, setTrips }){

    const [isEditing, setIsEditing] = useState(false);

    function handleAddVisit(){

        setIsEditing(true);
        
        const newVisit = {
            id: Date.now(),
            cover:"",
            location:{
                name:"",
                lat:"",
                lon:""
            },
            date:"",
        }

        const newTrips = trips.map((trip)=>{
            if(trip === selected){
                return {...trip, visits: [...trip.visits, newVisit]}
            }
            return trip
        })

        setTrips(newTrips);
        const newSelected = newTrips.find((trip) => trip.id === selected.id);
        setSelected(newSelected);
    }

    // function MapRender(){
    //     const MapMarkers = selected.visits.map((visit) => {
    //         return <TripMap name={visit.location.name} lat={visit.location.lat} lon={visit.location.lon}/>
    //     })
        
    //     return MapMarkers
    // }

    console.log("Selected trip:", selected);
console.log("Visits:", selected.visits);
    // console.log(trips);


    return(
        <div className='visit-gallery-wrapper'>
        <div className='visit-gallery'>
            <div className='visit-gallery-header'>
            <h2>Visit Gallery</h2>
            <button className='add-visit-btn' onClick={handleAddVisit}>Add Visit</button>
            </div>
            <div className='divider'></div>
        {selected.visits.map((visit)=>(
        <VisitCard key={visit.id}
        visit = {visit}
        trips={trips}
        setTrips={setTrips}
        selected={selected}
        setSelected={setSelected}
        isEditing={isEditing}
        setIsEditing={setIsEditing}/>
    ))}
        </div>
        <aside className="side-map" aria-hidden={false}>
            <div className="map-inner">
                <TripMap trips={trips} selected={selected}/>
            </div>
        </aside>
        </div>
    )
}

export default VisitGallery