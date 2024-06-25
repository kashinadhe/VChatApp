import React, { createContext, useContext, useState } from 'react'

// Auth context is used to navigate the user to the home page when they log in
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}

//custom hook for auth context
export const useAuthContext = () => {
    return useContext(AuthContext);
}