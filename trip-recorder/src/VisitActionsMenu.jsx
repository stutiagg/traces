import MoreActions from "./MoreActions";

function VisitActionsMenu({setIsEditing, visit, setTrips, setSelected, trips, selected}){

    function handleEdit(){
        setIsEditing(true);
    }

    function handleDelete(){
        const NewTrips = trips.map((trip)=>{
            if(trip.id === selected.id){
                const newVisits = trip.visits.filter(vis => vis.id !== visit.id);
                return {...trip, visits: newVisits}
                }
            return trip
            })
        setTrips(NewTrips);
        const newSelected = NewTrips.find((trip) => trip.id === selected.id);
        setSelected(newSelected);
    }


    return <MoreActions handleEdit={handleEdit} handleDelete={handleDelete}/>
}

export default VisitActionsMenu