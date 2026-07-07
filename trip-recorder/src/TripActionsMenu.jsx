import MoreActions from "./MoreActions";
import API from './api';

function TripActionsMenu({trip, trips, setTrips, setCreateMode, setEditingTrip}){

    async function handleDelete(){
        try{
            const id = trip.id;
            const token = localStorage.getItem("token");
            const response = await API.delete(`trips/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            })
             setTrips((prev) => prev.filter(tri => tri.id !== id));

        } catch (err) {
            console.log(err.response?.data);
        }
    
   
    }

    function handleEdit(){
        setEditingTrip(trip);
        setCreateMode("edit");
    }
    
return <MoreActions handleEdit={handleEdit}
handleDelete={handleDelete}/>
    
}

export default TripActionsMenu