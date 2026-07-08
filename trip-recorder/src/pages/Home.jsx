import Navbar from '../Navbar'
import Map from '../Map'
import TripGallery from '../TripGallery'

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
      
</>

)};

export default Home;