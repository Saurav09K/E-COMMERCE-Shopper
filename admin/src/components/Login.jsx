import React, { useState } from 'react';
import axios from 'axios'; 

const backendUrl = "http://localhost:4000"; 

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };
    
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-group">
                        <p>Email Address</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            type="email" 
                            placeholder="admin@shopmates.com" 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <p>Password</p>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            type="password" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;