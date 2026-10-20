import "./Navbar.css";
import AccountMenu from "./AccountMenu";

function Navbar({ userEmail, onLogout }) {
    return (
        <header className="navbar">
            <span className="navbar-brand">TRACES</span>
            <AccountMenu userEmail={userEmail} onLogout={onLogout} placement="mobile" />
        </header>
    );
}

export default Navbar;