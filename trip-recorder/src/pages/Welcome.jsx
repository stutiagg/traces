import { Link } from "react-router-dom";
import logo from "../assets/logo_blue.png";
import backdrop from "../assets/backdrop.jpg";
import "./Welcome.css";

function Welcome() {
    return (
        <main
            className="welcome-page"
            style={{ "--welcome-backdrop": `url("${backdrop}")` }}
        >
            <Link className="welcome-brand" to="/" aria-label="Traces home">
                <img src={logo} alt="Traces" />
            </Link>
            <section className="welcome-content" aria-labelledby="welcome-heading">
                <h1 id="welcome-heading">
                    Map the moments <span>that matter.</span>
                </h1>
                <p className="welcome-description">
                    Keep your trips, places, and memories together. Relive every
                    journey on your personal travel map.
                </p>
                <div className="welcome-actions">
                    <Link className="welcome-button welcome-button-primary" to="/register">
                        Sign up
                    </Link>
                    <Link className="welcome-button welcome-button-secondary" to="/login">
                        Log in
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Welcome;
