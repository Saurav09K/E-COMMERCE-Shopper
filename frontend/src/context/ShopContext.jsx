import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    
    const [products, setProducts] = useState([]); 

    const backendUrl = 'http://localhost:5000';

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            
            if (response.data.success) {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const logoutUser = async () => {
        try {
            await axios.post(`${backendUrl}/api/user/logout`, {}, { withCredentials: true });
            setToken("");
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Fetch products automatically when the app loads ---
    useEffect(() => {
        getProductsData();
    }, []);

    const value = {
        token, setToken,
        user, setUser,
        products, backendUrl, 
        logoutUser
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};