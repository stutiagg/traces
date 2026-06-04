import "./CreateTripForm.css"
import { useState } from "react"
function CreateTripForm({setCreateMode, setTrips, trips}){

    const [newTrip, setNewTrip] = useState({
        id: "",
        name: "",
        start: "",
        end: "",
        cover: "",
        description: "",
        visits: []
    })

    function handleCreateTrip(){
        setTrips([...trips, {...newTrip, id: Date.now()}])
        setCreateMode(false)
    }

    return(
        <div className="trip-form-overlay">
        <div className="trip-form">

            <div>CREATE TRIP</div>
            <label>Trip Name:</label>
            <input type="text" placeholder="Enter Trip Title" value={newTrip.name} onChange={(e) => setNewTrip({...newTrip, name: e.target.value})}/>
        
        
            <label>Start Date:</label>
            <input type ="text" placeholder="Mon YYYY" value={newTrip.start} onChange={(e) => setNewTrip({...newTrip, start: e.target.value})}/>
        
            <label>End Date:</label>
            <input type ="text" placeholder="Mon YYYY" value={newTrip.end} onChange={(e) => setNewTrip({...newTrip, end: e.target.value})}/>

            <label>Cover Picture:</label>
            <input type="file" onChange={(e) => setNewTrip({...newTrip, cover: URL.createObjectURL(e.target.files[0])})}></input>

            <button onClick={()=>setCreateMode(false)}>Close</button>
            <button onClick={handleCreateTrip}>Create Trip</button>
            
        </div>
        </div>
    )
}

export default CreateTripForm