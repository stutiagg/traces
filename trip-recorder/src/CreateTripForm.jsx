
import "./CreateTripForm.css"
import { useState } from "react"
import API from "./api";
import supabase from "./supabase";
import { useParams } from 'react-router-dom';

function CreateTripForm({setCreateMode, setTrips, trips, trip, mode}){

    // const NewTripEdit = {
    //     name: trip?.name || "",
    //     start_date: trip?.start || "",
    //     end_date: trip?.end || "",
    //     cover_url: trip?.cover || "",
    //     description: trip?.description || ""
    // }

    const NewTripCreate = {
        name: "",
        start_date: "",
        end_date: "",
        cover_url: "",
        description: ""
    }

   
    async function handleCreateTrip() {
        try{
            const token = localStorage.getItem("token");
            const response = await API.post('/trips', newTrip, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setCreateMode(null);

        setTrips((prev) => [
            ...prev,
            response.data[0]
            ]);

        
        } catch (err) {
            console.log(err.response?.data);
        }
    }

    const [newTrip, setNewTrip] = useState((mode === "edit") ? trip : NewTripCreate);

    // function handleCreateTrip(){
    //     setTrips([...trips, {...newTrip, id: Date.now()}])
    //     setCreateMode(null)
    // }

    // function handleEditTrip(){
    //     const NewTrips = trips.map((tri)=>{
    //         if(tri.id === trip.id){
    //             return ({...newTrip, id: tri.id})
    //         }
    //         return tri
    //     })

    //     setTrips(NewTrips);
    //     setCreateMode(null);
    // }

    async function handleEditTrip() {
        try{
            const token = localStorage.getItem("token");
            const id = trip.id;
            const response = await API.put(`/trips/${id}`, newTrip, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setTrips((prev) =>
  prev.map((t) =>
    t.id === response.data.id ? response.data : t
  )
);  setCreateMode(null);
            
        } catch (err) {
            console.log(err.response?.data);
        }
    }


async function saveCover(e) {
  const file = e.target.files[0];

  if (!file) return;

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("trip-covers")
    .upload(fileName, file);

  if (error) {
    console.log(error);
    return;
  }

  const { data } = supabase.storage
    .from("trip-covers")
    .getPublicUrl(fileName);

  setNewTrip((prev) => ({
    ...prev,
    cover_url: data.publicUrl,
  }));
}

    return(
        <div className="trip-form-overlay">
        <div className="trip-form">
           
            <div>{mode.toUpperCase()} TRIP</div>

            <label>Trip Name:</label>
            <input type="text" placeholder="Enter Trip Title" value={newTrip.name} onChange={(e) => setNewTrip({...newTrip, name: e.target.value})}/>
        
            <label>Start Date:</label>
            <input type ="text" placeholder="Mon YYYY" value={newTrip.start_date} onChange={(e) => setNewTrip({...newTrip, start_date: e.target.value})}/>
        
            <label>End Date:</label>
            <input type ="text" placeholder="Mon YYYY" value={newTrip.end_date} onChange={(e) => setNewTrip({...newTrip, end_date: e.target.value})}/>

            <label>Cover Picture:</label>
            {/* <input type="file" onChange={(e) => setNewTrip({...newTrip, cover_url: URL.createObjectURL(e.target.files[0])})}></input> */}
            <input type="file" onChange={(e) => saveCover(e)}></input>

            <div className="button-row">
                <button onClick={()=>setCreateMode(null)}>Close</button>
                <button onClick={mode === "create" ? handleCreateTrip : handleEditTrip}> {mode.charAt(0).toUpperCase() + mode.slice(1)} Trip</button>
            </div>


        </div>
        </div>
    )
}

export default CreateTripForm