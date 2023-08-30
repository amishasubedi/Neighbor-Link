import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Initialize with null

    const logout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        currentUser, // Include the currentUser state
        setCurrentUser,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
