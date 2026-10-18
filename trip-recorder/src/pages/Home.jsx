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
  onLogout,
  tripStatus,
  tripError,
  onRetryTrips,
}) {

return(
<>
      <Navbar onLogout={onLogout} />
      <Map />
      {tripStatus === "loading" && (
        <p className="trip-data-state" role="status">Loading trips...</p>
      )}
      {tripStatus === "error" && (
        <div className="trip-data-state trip-data-error" role="alert">
          <p>{tripError}</p>
          <button type="button" onClick={onRetryTrips}>Try again</button>
        </div>
      )}
      {tripStatus === "success" && (
        <TripGallery trips={trips} setTrips={setTrips} setCreateMode={setCreateMode} setEditingTrip={setEditingTrip}/>
      )}
      
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