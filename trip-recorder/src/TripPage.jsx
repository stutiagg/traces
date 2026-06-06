import VisitGallery from './VisitGallery';
import { useState } from 'react';

import './TripPage.css';
import header from './assets/picture1.jpg';

function TripPage({ selected, setSelected, trips, setTrips }) {
    const [description, setDescription] = useState(selected.description);
    const [isEditing, setIsEditing] = useState(true);

    function handleEnter() {
        const newTrips = trips.map((trip) => {
            if (trip.id === selected.id) {
                return { ...trip, description: description };
            }

            return trip ;
        });

        // console.log(newTrips);
        setTrips(newTrips);

        const newSelected = newTrips.find((trip) => trip.id === selected.id);
        setSelected(newSelected);
        setIsEditing(false);
    }

    return (
        <div className="trip-page">
            <div className="header">
                <img className="header-img" src={selected.cover} alt="cover" />

                <div>
                    <div className="trip-title">
                        <h1>{selected.name}</h1>
                        <div className="divider"></div>
                        <h2 className="dates">
                            {selected.start} - {selected.end}
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
            setSelected={setSelected} 
            trips={trips}
            setTrips={setTrips}/>
            <button onClick={()=>setSelected(null)}>CLOSE PAGE</button>
        </div>
    );
}

export default TripPage;