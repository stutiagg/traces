import { useState } from 'react'
import Navbar from './Navbar'
import Map from './Map'
import TripGallery from './TripGallery'
import CreateTripForm from './CreateTripForm'
import Sidebar from './Sidebar'
import TripPage from './TripPage'
import MoreActionsMenu from './TripActionsMenu'
import './App.css'

function App() {

  const [createMode, setCreateMode] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);
  

  return (
  
  <div className='layout'>
    <Sidebar setCreateMode={setCreateMode} />


    <div className='main-content'>
      {!selected && (
      <>
      <Navbar />
      <Map />
      <TripGallery trips={trips} setSelected={setSelected} setTrips={setTrips} setCreateMode={setCreateMode} setEditingTrip={setEditingTrip}/>
      </>
      )}

      {selected && (
        <TripPage  selected = {selected} trips={trips} setSelected={setSelected} setTrips={setTrips}/>
      )}

      {createMode && (
        <CreateTripForm mode={createMode} setCreateMode={setCreateMode} setTrips={setTrips} trips={trips} trip={editingTrip}/>
      )}

      

    </div>
  </div>
)
}

export default App
