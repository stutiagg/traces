import "./Sidebar.css"
import logo from './assets/logo.png'
function Sidebar({setCreateMode}){
    return(
        <div className="sidebar">
            <img src = {logo} className="logo"/>
            <div className="side-btns">
                <button>Home</button>
                <button>Feed</button>
                <button>Map</button>
                <div className="add-trip-wrapper">
                    <button className="add-trip-btn" onClick={() => { setCreateMode('create') }}>ADD TRIP</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
