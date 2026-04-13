import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 

export const protectRoute = async (req, res, next) => {
    try {
        let token;

        // Check if the token is passed in the authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Extract the token (Format is "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }

        next(); 

    } catch (error) {
        console.error('Auth middleware error:', error.message);
        res.status(401).json({ success: false, message: 'Not authorized. Token failed or expired.' });
    }
};


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
    }
};