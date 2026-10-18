import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
    return (
        <main className="welcome-page">
            <p className="welcome-brand">Traces</p>
            <h1>Keep your trips in one place.</h1>
            <p className="welcome-description">
                Record the places you visit and map your journeys.
            </p>
            <div className="welcome-actions">
                <Link className="welcome-button welcome-button-primary" to="/register">
                    Sign up
                </Link>
                <Link className="welcome-button" to="/login">
                    Log in
                </Link>
            </div>
        </main>
    );
}

export default Welcome;
