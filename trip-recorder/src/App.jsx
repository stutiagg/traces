import { useState } from 'react'
import Navbar from './Navbar'
import Map from './Map'
import TripGallery from './TripGallery'
import CreateTripForm from './CreateTripForm'
import Sidebar from './Sidebar'
import TripPage from './TripPage'
import './App.css'

function App() {

  const [createMode, setCreateMode] = useState(false);
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState(null);

  return (
  
  <div className='layout'>
    <Sidebar setCreateMode={setCreateMode} />


    <div className='main-content'>
      {!selected && (
      <>
      <Navbar />
      <Map />
      <TripGallery trips={trips} setSelected={setSelected}/>
      </>
      )}

      {selected && (
        <TripPage  selected = {selected} trips={trips} setSelected={setSelected} setTrips={setTrips}/>
      )}

      {createMode && (
        <CreateTripForm setCreateMode={setCreateMode} setTrips={setTrips} trips={trips} />
      )}
    </div>
  </div>
)
}

export default App
