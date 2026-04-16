import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { mockProducts } from "../assets/mockProducts";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState({});
    
    const [products, setProducts] = useState(mockProducts); 

    const backendUrl = 'http://localhost:5000';

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            
            if (response.data.success) {
                setProducts(response.data.product);
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

    // Fetch products automatically when the app loads
    useEffect(() => {
        getProductsData();
    }, []);


const addToCart = async (itemId, size) => {
        if (!size) { alert('Please select a product size first!'); return; }
        if (!token) { alert('Please log in to add items to your cart.'); return; }

        // --- 1. INSTANT FRONTEND UPDATE (Optimistic UI) ---
        // We create a deep copy of your cart, add the item, and save it instantly.
        let cartData = structuredClone(cartItems);
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        
        // Boom! The Navbar bubble and Cart page update instantly.
        setCartItems(cartData); 

        //  SILENT BACKEND UPDATE
        try {
            await axios.post(
                `${backendUrl}/api/cart/add`, 
                { itemId, size }, 
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            // We can remove the annoying alert() now, because seeing the 
            // red bubble instantly update is a much better user experience!
        } catch (error) {
            console.error("Add to cart error:", error);
            alert(error.response?.data?.message || "Failed to add to cart");
        }
    };


    const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
        for (const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return totalCount;
}


    //  Fetch the user's saved cart from MongoDB 
    const getUserCart = async (userToken) => {
        try {
            const response = await axios.get(`${backendUrl}/api/cart/get`, { 
                headers: { token: userToken } 
            });
            
            if (response.data.success) {
                setCartItems(response.data.cartData); 
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        // First update the UI instantly so it feels fast
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        // Then update the database in the background
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error("Failed to update quantity:", error);
            }
        }
    }

    // --- NEW: Auto-fetch the cart when the token loads ---
    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        token, setToken,
        user, setUser,
        products, backendUrl, 
        addToCart,
        logoutUser,
        cartItems, setCartItems, 
        getCartCount,
        updateQuantity

    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};