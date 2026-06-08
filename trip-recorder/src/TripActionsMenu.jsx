import MoreActions from "./MoreActions";

function TripActionsMenu({trip, trips, setTrips, setCreateMode, setEditingTrip}){

    function handleDelete(){
    setTrips(trips.filter(tri => tri.id !== trip.id));
    }

    function handleEdit(){
        setEditingTrip(trip);
        setCreateMode("edit");
    }
    
return <MoreActions handleEdit={handleEdit}
handleDelete={handleDelete}/>
    
}

export default TripActionsMenu