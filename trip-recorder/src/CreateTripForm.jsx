
import "./CreateTripForm.css"
import { useState } from "react"
import API from "./api";
import supabase from "./supabase";

function CreateTripForm({setCreateMode, setTrips, trip, mode}){

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
    
    const [newTrip, setNewTrip] = useState((mode === "edit") ? trip : NewTripCreate);
    const [uploading, setUploading] = useState(false);
    const [coverUploadError, setCoverUploadError] = useState("");

   
    async function handleCreateTrip(event) {
        event.preventDefault();
        try{
            const token = localStorage.getItem("token");
            console.log(newTrip);
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

    async function handleEditTrip(event) {
        event.preventDefault();
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
    t.id === response.data[0].id ? response.data[0] : t
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

  setUploading(true);
  setCoverUploadError("");

  try {
    const { error } = await supabase.storage
      .from("trip-covers")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("trip-covers")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      throw new Error("Storage did not return a public cover URL.");
    }

    setNewTrip(prev => ({
      ...prev,
      cover_url: data.publicUrl,
    }));
  } catch (error) {
    console.error("Trip cover upload failed:", error);
    setCoverUploadError("Unable to upload the cover photo. Please try again.");
  } finally {
    setUploading(false);
  }
}

    return(
        <div className="trip-form-overlay">
        <form className="trip-form" onSubmit={mode === "create" ? handleCreateTrip : handleEditTrip} aria-labelledby="trip-form-heading">
           
            <h2 id="trip-form-heading">{mode.toUpperCase()} TRIP</h2>

            <label htmlFor="trip-name">Trip Name:</label>
            <input id="trip-name" name="name" type="text" placeholder="Enter Trip Title" value={newTrip.name} onChange={(e) => setNewTrip({...newTrip, name: e.target.value})}/>
        
            <label htmlFor="trip-start-date">Start Date:</label>
            <input id="trip-start-date" name="start_date" type="date" value={newTrip.start_date} onChange={(e) => setNewTrip({...newTrip, start_date: e.target.value})}/>
        
            <label htmlFor="trip-end-date">End Date:</label>
            <input id="trip-end-date" name="end_date" type="date" value={newTrip.end_date} onChange={(e) => setNewTrip({...newTrip, end_date: e.target.value})}/>

            <label htmlFor="trip-cover">Cover Picture:</label>
            {/* <input type="file" onChange={(e) => setNewTrip({...newTrip, cover_url: URL.createObjectURL(e.target.files[0])})}></input> */}
            <input id="trip-cover" name="cover" type="file" onChange={(e) => saveCover(e) }></input>
            {coverUploadError && <p className="cover-upload-error" role="alert">{coverUploadError}</p>}

            <div className="button-row">
                <button type="button" onClick={()=>setCreateMode(null)}>Close</button>
                <button type="submit" disabled={uploading}> {mode.charAt(0).toUpperCase() + mode.slice(1)} Trip</button>
            </div>


        </form>
        </div>
    )
}

export default CreateTripForm