import { useState, useEffect, useRef } from 'react'
import CreateTripForm from './CreateTripForm'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import TripPage from './TripPage'



import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'
import ComingSoon from './pages/ComingSoon'
import API from './api'

import './App.css'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("token"))
  );
  const [userEmail, setUserEmail] = useState("");
  const [createMode, setCreateMode] = useState(null);
  const [trips, setTrips] = useState([]);
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

  function handleLogin(email) {
    setTripError("");
    setTripStatus("loading");
    setUserEmail(email);
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
    setUserEmail("");
    setTrips([]);
    setEditingTrip(null);
    setCreateMode(null);
    setTripStatus("idle");
    setTripError("");
  }


  

  return (
  
  <div className={`layout ${isAuthenticated ? "authenticated-layout" : "public-layout"}`}>
  {isAuthenticated && <Sidebar userEmail={userEmail} onLogout={handleLogout} />}

  <div className="main-content">
    {isAuthenticated && <Navbar userEmail={userEmail} onLogout={handleLogout} />}
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
        path="/feed"
        element={
          isAuthenticated ? (
            <ComingSoon
              icon="feed"
              title="Your travel feed is on its way"
              message="We're working on a better way to follow journeys and discover travel stories."
              badge="Coming soon"
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/map"
        element={
          isAuthenticated ? (
            <ComingSoon
              icon="map"
              title="Your world, coming together"
              message="A dedicated view of your travels is currently under development."
              badge="Under development"
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
