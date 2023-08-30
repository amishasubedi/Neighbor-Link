import React, { useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import {useNavigate} from 'react-router-dom'
import { useAuth } from './AuthContext';

import './Login.css';

const Login = () => {
    const { setIsLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const db = getDatabase();
        const userRef = ref(db, 'users'); 

        onValue(userRef, (snapshot) => {
            const users = snapshot.val();
            
            const user = Object.values(users).find(user => user.email === email);

            if (user && user.password === password) { 
                console.log("Logged in:", user);
                
                setIsLoggedIn(true);
                setEmail('');
                setPassword('');

                // Redirect to homepage
                navigate('/');

            } else {
                console.error("Error logging in: Invalid credentials");
                setError("Invalid email or password");
                setIsLoggedIn(false);
            }
        });
    };


   // LoginForm.js
return (
    <div className="login-container">
        <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    </div>
);

};

export default Login;
