import "./Login.css";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useState } from "react";

function Login({onLogin}){

    const [form, setForm] = useState({
            email:"",
            password:""
        });
    
    const [error, setError] = useState("");

    async function handleLogin(event) {
        event.preventDefault();
        setError("");
        try{
            const response = await API.post('/auth/login', form);
            
            localStorage.setItem("token", response.data.token);
            onLogin(form.email);
            navigate('/');
            
        } catch (err) {
            setError(err.response?.data?.message || "Unable to log in. Please try again.");
        }
    };

    const navigate = useNavigate();
    return(
        <>
        <div className="login-form-overlay">
        <form className="login-form" onSubmit={handleLogin} aria-labelledby="login-heading">
           
            <h1 id="login-heading">LOGIN</h1>

            <label htmlFor="login-email">Email:</label>
            <input id="login-email" type="email" autoComplete="email" required placeholder="Enter Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
        
            <label htmlFor="login-password">Password:</label>
            <input id="login-password" type="password" autoComplete="current-password" required placeholder="Enter password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
        
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="button-row">
                <button type="button" onClick={() => navigate('/register')}>Signup</button>
                <button type="submit">Login</button>
            </div>


        </form>
        </div>
        </>
    )
}

export default Login;