import "./Sidebar.css"
import logo from './assets/logo_blue.png'

function Sidebar(){
    return(
        <div className="sidebar">
            <img src = {logo} className="logo"/>
            <div className="side-btns">
                <button>Home</button>
                <button>Feed</button>
                <button>Map</button>
                
            </div>
        </div>
    )
}

export default Sidebar
