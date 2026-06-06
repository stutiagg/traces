import './VisitGallery.css'
import VisitCard from './VisitCard'
function VisitGallery({ selected, setSelected, trips, setTrips }){

    function handleAddVisit(){
        const newVisit = {
            id: Date.now(),
            cover:"",
            location:"",
            date:""
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

    // console.log(trips);


    return(
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
        setSelected={setSelected}/>
    ))}
        </div>
    )
}

export default VisitGallery