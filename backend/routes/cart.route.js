import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

// Route: /api/cart/
router.post('/add', protectRoute, addToCart);
router.get('/get', protectRoute, getUserCart); 
router.post('/update', protectRoute, updateCart);

export default router;