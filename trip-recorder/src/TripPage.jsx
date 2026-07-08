import VisitGallery from './VisitGallery';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";


import './TripPage.css';

function TripPage({ trips, setTrips, loading }) {


    const { id } = useParams();

    const navigate = useNavigate();

    const selected = trips.find(
    (trip) => trip.id.toString() === id
    );

    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(true);

    useEffect(() => {
    if (selected) {
        setDescription(selected.description);
    }
}, [selected]);

     if(loading){
        return <h2>Loading...</h2>;
    }

    if (!selected) {
    return <h2>Trip not found.</h2>;
    }

    

    function handleEnter() {
        const newTrips = trips.map((trip) => {
            if (trip.id === selected.id) {
                return { ...trip, description: description };
            }

            return trip ;
        });
        setTrips(newTrips);
        setIsEditing(false);
    }

    return (
        <div className="trip-page">
            <div className="header">
                <img className="header-img" src={selected.cover_url} alt="cover" />

                <div>
                    <div className="trip-title">
                        <h1>{selected.name}</h1>
                        <div className="divider"></div>
                        <h2 className="dates">
                            {selected.start_date} - {selected.end_date}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="description-box">
                <h3 className="section-heading">Description</h3>
                <div className="divider"></div>

                {isEditing ? (
                    <input
                        type="text"
                        placeholder="Enter the Description"
                        onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                ) : (
                    <div className="description">{description}</div>
                )}
            </div>

            <VisitGallery selected = {selected} 
            trips={trips}
            setTrips={setTrips}/>
            <button onClick={()=> navigate("/")}>CLOSE PAGE</button>
        </div>
    );
}

export default TripPage;