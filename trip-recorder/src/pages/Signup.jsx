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

    async function handleSignup() {
        setError("");
        try{
            await API.post('/auth/register', form);
            navigate('/login');
    } catch (err) {
        setError( err.response?.data?.message);
    }
    };


    return(
        <>
        <div className="signup-form-overlay">
        <div className="signup-form">
           
            <div>SIGNUP</div>

            <label>Email:</label>
            <input type="text" placeholder="Enter Email" value = {form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
        
            <label>Password:</label>
            <input type ="password" placeholder="Enter password" value = {form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
        
            {error && <p>{error}</p>}
            <div className="button-row">
                <button onClick={() => navigate('/login')}>Login</button>  {/* path to Login page */}
                <button onClick={handleSignup}>Signup</button>
            </div>


        </div>
        </div>
        </>
    )
}

export default Signup;