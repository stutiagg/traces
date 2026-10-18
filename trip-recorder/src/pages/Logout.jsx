import { useNavigate } from "react-router-dom";
import './Logout.css'

function Logout({onLogout}){
     const navigate = useNavigate();

    function handleLogout() {
        onLogout();
        navigate("/", { replace: true });
    }

    return <button className="logout-btn" onClick={handleLogout}>Logout</button>;
}

export default Logout;