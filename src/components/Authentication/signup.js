import React, { useState } from 'react';
import { ref, push, getDatabase, set } from 'firebase/database';

import './Login.css';

const Signup = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        
        const db = getDatabase();
        const userRef = ref(db, 'users');
        const newUserRef = push(userRef);

        try {
            await set(newUserRef, {
                name: userData.name,
                email: userData.email
            });
            alert('User registered successfully');
            setUserData({ name: '', email: '', password: '' }); // Reset the form
        } catch(err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={userData.name}
                    placeholder="Name" 
                    onChange={handleChange} 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={userData.email}
                    placeholder="Email" 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={userData.password}
                    placeholder="Password" 
                    onChange={handleChange} 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Signup;
