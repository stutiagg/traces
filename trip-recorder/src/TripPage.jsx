import VisitGallery from './VisitGallery';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import API from './api';
import TripCover from './TripCover';



import './TripPage.css';

function TripPage({ trips, setTrips, tripStatus, tripError, onRetryTrips }) {


    const { id } = useParams();

    const navigate = useNavigate();

    const selected = trips.find(
    (trip) => trip.id.toString() === id
    );

    const [descriptionDraft, setDescriptionDraft] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isSavingDescription, setIsSavingDescription] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");

     if (tripStatus === "loading" || tripStatus === "idle") {
        return <h2 role="status">Loading...</h2>;
    }

    if (tripStatus === "error") {
        return (
            <div className="trip-load-state" role="alert">
                <p>{tripError}</p>
                <button type="button" onClick={onRetryTrips}>Try again</button>
            </div>
        );
    }

    if (!selected) {
    return <h2>Trip not found.</h2>;
    }

    

    // function handleEnter() {
    //     const newTrips = trips.map((trip) => {
    //         if (trip.id === selected.id) {
    //             return { ...trip, description: description };
    //         }

    //         return trip ;
    //     });
    //     setTrips(newTrips);
    //     setIsEditing(false);
    // }
    
    async function saveDescription(event){
        event.preventDefault();
        setDescriptionError("");
        setIsSavingDescription(true);
        try{
            const token = localStorage.getItem("token");
            const response = await API.put(`/trips/${id}`, {...selected, description: descriptionDraft}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTrips(prev =>
    prev.map(trip =>
        trip.id === selected.id
            ? response.data[0]
            : trip
    )
);
            setIsEditing(false);
        } catch(err) {
            console.log(err.response?.data);
            setDescriptionError("Unable to save the description. Please try again.");
        } finally {
            setIsSavingDescription(false);
        }
    }

    function cancelDescriptionEdit() {
        setDescriptionError("");
        setIsEditing(false);
    }

    return (
        <div className="trip-page">
            <div className="header">
                <TripCover
                    className="header-img"
                    src={selected.cover_url}
                    alt={selected.name ? `Cover photo for ${selected.name}` : "Trip cover photo"}
                />

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
                <div className="description-heading-row">
                    <h3 className="section-heading">Description</h3>
                    {!isEditing && (
                        <button
                            className="description-action"
                            type="button"
                            onClick={() => {
                                setDescriptionDraft(selected.description ?? "");
                                setDescriptionError("");
                                setIsEditing(true);
                            }}
                        >
                            Edit
                        </button>
                    )}
                </div>
                <div className="divider"></div>

                {isEditing ? (
                    <form className="description-form" onSubmit={saveDescription}>
                        <label htmlFor="trip-description">Trip description</label>
                        <textarea
                            id="trip-description"
                            value={descriptionDraft}
                            placeholder="Enter the description"
                            onChange={(e) => setDescriptionDraft(e.target.value)}
                        />
                        {descriptionError && <p className="description-error" role="alert">{descriptionError}</p>}
                        <div className="description-actions">
                            <button className="description-action" type="submit" disabled={isSavingDescription}>
                                {isSavingDescription ? "Saving..." : "Save"}
                            </button>
                            <button className="description-action" type="button" onClick={cancelDescriptionEdit} disabled={isSavingDescription}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="description">{selected.description ?? ""}</div>
                )}
            </div>

            <VisitGallery key={id} selected = {selected}
            trips={trips}
            setTrips={setTrips}/>
            <button onClick={()=> navigate("/")}>CLOSE PAGE</button>
        </div>
    );
}

export default TripPage;