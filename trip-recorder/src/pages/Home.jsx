import Navbar from '../Navbar'
import Map from '../Map'
import TripGallery from '../TripGallery'
import { Plus } from "lucide-react";
import './Home.css'

function Home({
  trips,
  setTrips,
  setCreateMode,
  setEditingTrip,
}) {

const token = localStorage.getItem("token");

return(
<>
      <Navbar />
      <Map />
      <TripGallery trips={trips} setTrips={setTrips} setCreateMode={setCreateMode} setEditingTrip={setEditingTrip}/>
      
      <div className="add-trip-wrapper">
    <button
        className="add-trip-btn"
        onClick={() => setCreateMode("create")}
    >
        <Plus size={24} strokeWidth={2.5} />
    </button>
   </div>
</>

)};

export default Home;