import "./Navbar.css";
import Logout from "./pages/Logout";
import { useState } from "react";

function Navbar() {
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
                            <Logout />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;