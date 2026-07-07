import MoreActions from "./MoreActions";
import API from './api';


function VisitActionsMenu({setEditingVisitsId, visit, setVisits}){

    function handleEdit(){
        setEditingVisitsId(visit.id);
    }

    async function handleDelete(){
        try{
            const token = localStorage.getItem("token");
            const response = await API.delete(`trips/${visit.trip_id}/visits/${visit.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            
            setVisits((prev) =>
  prev.filter((v) => String(v.id) !== String(visit.id))
);

        } catch (err) {
            console.log(err.response?.data);
        }

        // const NewTrips = trips.map((trip)=>{
        //     if(trip.id === selected.id){
        //         const newVisits = trip.visits.filter(vis => vis.id !== visit.id);
        //         return {...trip, visits: newVisits}
        //         }
        //     return trip
        //     })
        // setTrips(NewTrips);
        // const newSelected = NewTrips.find((trip) => trip.id === selected.id);
        // setSelected(newSelected);
    }


    return <MoreActions handleEdit={handleEdit} handleDelete={handleDelete}/>
}

export default VisitActionsMenu