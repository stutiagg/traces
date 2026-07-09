import "./Sidebar.css"
import logo from './assets/logo_blue.png'
import { Plus } from "lucide-react";
function Sidebar({setCreateMode}){
    return(
        <div className="sidebar">
            <img src = {logo} className="logo"/>
            <div className="side-btns">
                <button>Home</button>
                <button>Feed</button>
                <button>Map</button>
                <div className="add-trip-wrapper">
    <button
        className="add-trip-btn"
        onClick={() => setCreateMode("create")}
    >
        <Plus size={24} strokeWidth={2.5} />
    </button>
</div>
            </div>
        </div>
    )
}

export default Sidebar
