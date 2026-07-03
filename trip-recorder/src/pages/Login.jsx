import "./Login.css";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useState } from "react";

function Login(){

    const [form, setForm] = useState({
            email:"",
            password:""
        });
    
    const [error, setError] = useState("");

    async function handleLogin() {
        try{
            const response = await API.post('/auth/login', form);
            
            localStorage.setItem("token", response.data.token);
            navigate('/');
            
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const navigate = useNavigate();
    return(
        <>
        <div className="login-form-overlay">
        <div className="login-form">
           
            <div>LOGIN</div>

            <label>Email:</label>
            <input type="text" placeholder="Enter Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
        
            <label>Password:</label>
            <input type ="password" placeholder="Enter password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
        
            {error && <p> {error} </p>}
            <div className="button-row">
                <button onClick={() => navigate('/register')}>Signup</button>  {/* path to Signup page */}
                <button onClick={handleLogin}>Login</button>  {/* path to Home page */}
            </div>


        </div>
        </div>
        </>
    )
}

export default Login;