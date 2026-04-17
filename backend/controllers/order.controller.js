import Order from '../models/order.model.js';
import User from '../models/user.model.js';

const placeOrderCOD = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        
        const userId = req.user._id; 

        const order = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        })

        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.error("Order error:", error);
        res.json({ success: false, message: error.message });
    }
};


const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Fetch orders error:", error);
        res.json({ success: false, message: error.message });
    }
};

export { placeOrderCOD, userOrders };