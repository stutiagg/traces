import { useState, useEffect, useRef } from 'react'
import CreateTripForm from './CreateTripForm'
import Sidebar from './Sidebar'
import TripPage from './TripPage'
import MoreActionsMenu from './TripActionsMenu'



import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'
import API from './api'

import './App.css'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("token"))
  );
  const [createMode, setCreateMode] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);
  const [tripStatus, setTripStatus] = useState(
    () => localStorage.getItem("token") ? "loading" : "idle"
  );
  const [tripError, setTripError] = useState("");
  const tripRequestId = useRef(0);
  const tripRequestController = useRef(null);

  async function fetchTrips() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    tripRequestController.current?.abort();
    const controller = new AbortController();
    tripRequestController.current = controller;
    const requestId = ++tripRequestId.current;
    setTripStatus("loading");
    setTripError("");

    try {
      const response = await API.get("/trips" , {
  signal: controller.signal,
  headers: {
    Authorization: `Bearer ${token}`,
  },
}); 
      if (requestId !== tripRequestId.current || !localStorage.getItem("token")) {
        return;
      }

      setTrips(response.data);
      setTripStatus("success");
    } catch (err) {
      if (requestId === tripRequestId.current && err.code !== "ERR_CANCELED") {
        if (err.response?.status === 401) {
          handleLogout();
          return;
        }

        console.log(err.response?.data);
        setTripError("Unable to load trips. Please try again.");
        setTripStatus("error");
      }
    } finally {
      if (requestId === tripRequestId.current) {
        tripRequestController.current = null;
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      void fetchTrips();
    }

    return () => {
      tripRequestId.current += 1;
      tripRequestController.current?.abort();
      tripRequestController.current = null;
    };
  }, [isAuthenticated]);

  function handleLogin() {
    setTripError("");
    setTripStatus("loading");
    if (isAuthenticated) {
      void fetchTrips();
    } else {
      setIsAuthenticated(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    tripRequestId.current += 1;
    tripRequestController.current?.abort();
    tripRequestController.current = null;
    setIsAuthenticated(false);
    setTrips([]);
    setSelected(null);
    setEditingTrip(null);
    setCreateMode(null);
    setTripStatus("idle");
    setTripError("");
  }


  

  return (
  
  <div className={`layout ${isAuthenticated ? "authenticated-layout" : "public-layout"}`}>
  {isAuthenticated && <Sidebar setCreateMode={setCreateMode} />}

  <div className="main-content">
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Home
              trips={trips}
              setTrips={setTrips}
              setCreateMode={setCreateMode}
              setEditingTrip={setEditingTrip}
              onLogout={handleLogout}
              tripStatus={tripStatus}
              tripError={tripError}
              onRetryTrips={fetchTrips}
            />
          ) : (
            <Welcome />
          )
        }
      />

      <Route
        path="/trips/:id"
        element={
          isAuthenticated ? (
            <TripPage
              trips={trips}
              setTrips={setTrips}
              tripStatus={tripStatus}
              tripError={tripError}
              onRetryTrips={fetchTrips}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/login"
        element = {
          <Login onLogin={handleLogin}/>
        }
      />

      <Route
        path="/register"
        element = {
          <Signup />
        }
      />
    </Routes>

    {isAuthenticated && createMode && (
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
