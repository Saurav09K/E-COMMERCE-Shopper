import User from '../models/user.model.js';


const addToCart = async (req, res) => {
    try {
        // 1. Get the user ID from the middleware, and the item details from the frontend
        const userId = req.user._id; 
        const { itemId, size } = req.body;

        if (!itemId || !size) {
            return res.status(400).json({ 
                success: false, 
                message: "Product ID and size are required." 
            });
        }

        // 2. Fetch the user's current cart
        const user = await User.findById(userId);
        
        // We make a copy of the existing cart object to modify it
        let cartData = user.cartData || {}; 

        // 3. The Logic: Does this product exist in the cart yet?
        if (!cartData[itemId]) {
            // If no, create an empty object for it
            cartData[itemId] = {};
        }

        // 4. Does this specific size exist for this product?
        if (cartData[itemId][size]) {
            // If yes, add 1 to the quantity
            cartData[itemId][size] += 1;
        } else {
            // If no, set the initial quantity to 1
            cartData[itemId][size] = 1;
        }

        // 5. Save the updated cart back to the database
        await User.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({ 
            success: true, 
            message: "Added to cart" 
        });

    } catch (error) {
        console.log("Add to cart error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
}


// Update cart quantities
const updateCart = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { itemId, size, quantity } = req.body;

        if (!itemId || !size || quantity === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: "Product ID, size, and quantity are required." 
            });
        }

        const user = await User.findById(userId);
        let cartData = user.cartData || {};

        // The Logic: If they set quantity to 0, they want to remove it
        if (quantity === 0) {
            delete cartData[itemId][size];
            
            // Cleanup: If there are no other sizes left for this shirt, delete the shirt drawer entirely
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            // Otherwise, just overwrite whatever quantity was there before with the new one
            cartData[itemId][size] = quantity;
        }

        await User.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({ 
            success: true, 
            message: "Cart updated successfully" 
        });

    } catch (error) {
        console.log("Update cart error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
}

// Fetch user cart data
const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        const cartData = user.cartData || {};

        return res.status(200).json({ 
            success: true, 
            cartData 
        });

    } catch (error) {
        console.log("Get cart error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
}


export { addToCart, updateCart, getUserCart };