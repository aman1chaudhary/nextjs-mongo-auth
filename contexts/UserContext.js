import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loginUser, setLoginUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setLoginUser(parsedUser);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <UserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
