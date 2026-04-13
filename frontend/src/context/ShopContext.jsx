import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    // The Access Token lives securely in React state (memory), safe from XSS!
    const [token, setToken] = useState(""); 
    const [user, setUser] = useState(null); 

    const value = {
        token, setToken,
        user, setUser
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};