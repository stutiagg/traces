import './VisitGallery.css'
import VisitCard from './VisitCard'
import { useEffect, useState } from 'react';
import TripMap from './TripMap';
import { useParams } from 'react-router-dom';
import API from './api';

function VisitGallery({ setSelected, trips, setTrips }){

    const { id } = useParams();

    const selected = trips.find(
    (trip) => trip.id.toString() === id
    );

    if (!selected) {
    return <h2>Trip not found.</h2>;
    }

    const [visits, setVisits] = useState([]);

    useEffect(() => {
  async function fetchVisits() {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/trips/${id}/visits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVisits(response.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  fetchVisits();
}, [id]);
    
const [editingVisitId, setEditingVisitId] = useState(null);

    function handleAddVisit(){
        
        const newVisit = {
            id: Date.now(),
            name:"",
            cover:"",
            date:null,
            latitude:"",
            longitude:""
        }

        setEditingVisitId(newVisit.id);

        setVisits((prev) => [...prev, newVisit]);
    }

    // function MapRender(){
    //     const MapMarkers = selected.visits.map((visit) => {
    //         return <TripMap name={visit.location.name} lat={visit.location.lat} lon={visit.location.lon}/>
    //     })
        
    //     return MapMarkers
    // }

    return(
        <div className='visit-gallery-wrapper'>
        <div className='visit-gallery'>
            <div className='visit-gallery-header'>
            <h2>Visit Gallery</h2>
            <button className='add-visit-btn' onClick={handleAddVisit}>Add Visit</button>
            </div>
            <div className='divider'></div>
        {visits.map((visit)=>(
        <VisitCard
        key = {visit.id}
        visit = {visit}
        trips={trips}
        setTrips={setTrips}
        setSelected={setSelected}
        editingVisitId={editingVisitId}
        setEditingVisitId={setEditingVisitId}

        setVisits={setVisits}/>
    ))}
        </div>
        <aside className="side-map" aria-hidden={false}>
            <div className="map-inner">
                <TripMap visits={visits}/>
            </div>
        </aside>
        </div>
    )
}

export default VisitGallery