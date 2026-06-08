
import "./CreateTripForm.css"
import { useState } from "react"
function CreateTripForm({setCreateMode, setTrips, trips, trip, mode}){

    const NewTripEdit = {
        id: trip?.id || "",
        name: trip?.name || "",
        start: trip?.start || "",
        end: trip?.end || "",
        cover: trip?.cover || "",
        description: trip?.description || "",
        visits: trip?.visits || []
    }

    const NewTripCreate = {
        id: "",
        name: "",
        start: "",
        end: "",
        cover: "",
        description: "",
        visits: []
    }

    const [newTrip, setNewTrip] = useState((mode === "edit") ? NewTripEdit : NewTripCreate);

    function handleCreateTrip(){
        setTrips([...trips, {...newTrip, id: Date.now()}])
        setCreateMode(null)
    }

    function handleEditTrip(){
        const NewTrips = trips.map((tri)=>{
            if(tri.id === trip.id){
                return ({...newTrip, id: tri.id})
            }
            return tri
        })

        setTrips(NewTrips);
        setCreateMode(null);
    }

    return(
        <div className="trip-form-overlay">
        <div className="trip-form">
           
            <div>{mode.toUpperCase()} TRIP</div>

            <label>Trip Name:</label>
            <input type="text" placeholder="Enter Trip Title" value={newTrip.name} onChange={(e) => setNewTrip({...newTrip, name: e.target.value})}/>
        
            <label>Start Date:</label>
            <input type ="text" placeholder="Mon YYYY" value={newTrip.start} onChange={(e) => setNewTrip({...newTrip, start: e.target.value})}/>
        
            <label>End Date:</label>
            <input type ="text" placeholder="Mon YYYY" value={newTrip.end} onChange={(e) => setNewTrip({...newTrip, end: e.target.value})}/>

            <label>Cover Picture:</label>
            <input type="file" onChange={(e) => setNewTrip({...newTrip, cover: URL.createObjectURL(e.target.files[0])})}></input>

            <div className="button-row">
                <button onClick={()=>setCreateMode(null)}>Close</button>
                <button onClick={mode === "create" ? handleCreateTrip : handleEditTrip}> {mode.charAt(0).toUpperCase() + mode.slice(1)} Trip</button>
            </div>


        </div>
        </div>
    )
}

export default CreateTripForm