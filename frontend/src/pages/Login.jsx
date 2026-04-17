import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, setUser } = useContext(ShopContext);

    const navigate = useNavigate();


    
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {

            let response;
            const backendUrl = 'http://localhost:5000'; 
            const config = { withCredentials: true };


            if (currentState === 'Sign Up') {
                response = await axios.post(`${backendUrl}/api/user/register`, {
                    name, email, password
                }, config);

                if (response.data.success || response.status === 201) {
                    alert("Registration successful! Please log in.");
                    setCurrentState('Login');
                }
            } else {
                response = await axios.post(`${backendUrl}/api/user/login`, {
                    email, password
                }, config);

                if (response.status === 200) {
                    setToken(response.data.accessToken);
                    setUser(response.data.user);
                    alert("Login Successful!");
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Auth Error:", error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="login-form">
            <div className="login-header">
                <h1 className="login-title">{currentState}</h1>
                <hr className="login-divider" />
            </div>

            {currentState === 'Sign Up' && (
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
            )}

            <input 
                type="email" 
                className="form-input" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
            />
            <input 
                type="password" 
                className="form-input" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
            />

            <div className="form-links">
                <p className="link-text">Forgot your password?</p>
                {
                    currentState === 'Login'
                    ? <p onClick={() => setCurrentState('Sign Up')} className="link-text bold">Create account</p>
                    : <p onClick={() => setCurrentState('Login')} className="link-text bold">Login Here</p>
                }
            </div>

            <button type="submit" className="submit-btn">
                {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
        </form>
    );
};

export default Login;