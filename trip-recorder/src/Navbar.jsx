import "./Navbar.css";
import Logout from "./pages/Logout";
import { useState } from "react";

function Navbar({onLogout}) {
    const [logoutBtn, setLogoutBtn] = useState(false);

    return (
        <div className="navbar">
            <div className="profile">
                <div className="profile-menu">
                    <span onClick={() => setLogoutBtn(!logoutBtn)}>
                        P
                    </span>

                    {logoutBtn && (
                        <div className="logout-menu">
                            <Logout onLogout={onLogout} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;