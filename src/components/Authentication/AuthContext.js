import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Initialize with null

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        currentUser, // Include the currentUser state
        setCurrentUser // Include the setCurrentUser function
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
