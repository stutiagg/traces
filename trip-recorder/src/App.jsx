import { useState, useEffect } from 'react'
import CreateTripForm from './CreateTripForm'
import Sidebar from './Sidebar'
import TripPage from './TripPage'
import MoreActionsMenu from './TripActionsMenu'



import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import API from './api'

import './App.css'

function App() {

  const [createMode, setCreateMode] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);

  

  async function fetchTrips() {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/trips" , {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}); 
      setTrips(response.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  useEffect(() => {

  fetchTrips();
}, []);


  

  return (
  
  <div className="layout">
  <Sidebar setCreateMode={setCreateMode} />

  <div className="main-content">
    <Routes>
      <Route
        path="/"
        element={
          <Home
            trips={trips}
            setTrips={setTrips}
            setCreateMode={setCreateMode}
            setEditingTrip={setEditingTrip}
          />
        }
      />

      <Route
        path="/trips/:id"
        element={
          <TripPage
            trips={trips}
            setTrips={setTrips}
          />
        }
      />

      <Route
        path="/login"
        element = {
          <Login fetchTrips={fetchTrips}/>
        }
      />

      <Route
        path="/register"
        element = {
          <Signup />
        }
      />
    </Routes>

    {createMode && (
      <CreateTripForm
        mode={createMode}
        setCreateMode={setCreateMode}
        setTrips={setTrips}
        trips={trips}
        trip={editingTrip}
      />
    )}
  </div>
</div>
)
}

export default App
