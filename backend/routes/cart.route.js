import express from 'express';
import { addToCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js'; // The gatekeeper

const router = express.Router();

// Route: POST /api/cart/add
router.post('/add', protectRoute, addToCart);

export default router;