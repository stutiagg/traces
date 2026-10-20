import "./Sidebar.css"
import logo from './assets/logo_blue.png'
import { House, Map, Rss } from "lucide-react"
import { NavLink } from "react-router-dom"
import AccountMenu from "./AccountMenu"

function Sidebar({ userEmail, onLogout }){
    return(
        <nav className="sidebar" aria-label="Main navigation">
            <img src={logo} className="logo" alt="Traces" />
            <div className="side-btns">
                <NavLink to="/" end className={({ isActive }) => isActive ? "side-link active" : "side-link"}>
                    <House aria-hidden="true" />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/feed" className={({ isActive }) => isActive ? "side-link active" : "side-link"}>
                    <Rss aria-hidden="true" />
                    <span>Feed</span>
                    <span className="side-link-badge" aria-hidden="true">Soon</span>
                    <span className="visually-hidden">Coming soon</span>
                </NavLink>
                <NavLink to="/map" className={({ isActive }) => isActive ? "side-link active" : "side-link"}>
                    <Map aria-hidden="true" />
                    <span>Map</span>
                    <span className="side-link-badge" aria-hidden="true">Soon</span>
                    <span className="visually-hidden">Under development</span>
                </NavLink>
            </div>
            <div className="sidebar-account">
                <AccountMenu userEmail={userEmail} onLogout={onLogout} placement="sidebar" />
            </div>
        </nav>
    )
}

export default Sidebar
