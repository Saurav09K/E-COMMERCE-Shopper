import express from 'express';
const router = express.Router();
import { placeOrderCOD,userOrders} from '../controllers/order.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';



// Route: /api/order/
router.post('/place', protectRoute, placeOrderCOD);
router.get('/myorders', protectRoute, userOrders);


export default router;

