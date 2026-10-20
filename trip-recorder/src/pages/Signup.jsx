import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import API from "../api";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:"",
        password:""
    });

    const [error, setError] = useState("");

    async function handleSignup(event) {
        event.preventDefault();
        setError("");
        try{
            await API.post('/auth/register', form);
            navigate('/login');
    } catch (err) {
        setError(err.response?.data?.message || "Unable to sign up. Please try again.");
    }
    };


    return(
        <>
        <div className="signup-form-overlay">
        <form className="signup-form" onSubmit={handleSignup} aria-labelledby="signup-heading">
           
            <h1 id="signup-heading">SIGNUP</h1>

            <label htmlFor="signup-email">Email:</label>
            <input id="signup-email" type="email" autoComplete="email" required placeholder="Enter Email" value = {form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
        
            <label htmlFor="signup-password">Password:</label>
            <input id="signup-password" type="password" autoComplete="new-password" required placeholder="Enter password" value = {form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
        
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="button-row">
                <button type="button" onClick={() => navigate('/login')}>Login</button>
                <button type="submit">Signup</button>
            </div>


        </form>
        </div>
        </>
    )
}

export default Signup;