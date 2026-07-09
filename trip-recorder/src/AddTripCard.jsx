import "./AddTripCard.css";
import { Plus } from "lucide-react";

function AddTripCard({setCreateMode}) {
    return (
        <div className="add-trip-card" onClick={() => setCreateMode("create")}>
            <Plus size={40} className="plus-icon" />
            <h2 className="add-trip-title">Add Trip</h2>
        </div>
    );
}

export default AddTripCard;