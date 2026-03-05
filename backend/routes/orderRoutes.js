import express from 'express';
const router = express.Router();
import {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
} from '../app/controllers/orderController.js';
import { protect, admin } from '../app/middleware/authMiddleware.js';

// Employee submits welcome kit request
router.post('/order', protect, createOrder);

// Employee gets their requests
router.get('/myorders', protect, getMyOrders);

// Admin gets all requests
router.get('/allorders', protect, admin, getAllOrders);

// Admin updates order status
router.put('/status/:id', protect, admin, updateOrderStatus);

export default router;
