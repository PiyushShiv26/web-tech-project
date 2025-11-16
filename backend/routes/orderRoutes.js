import express from 'express';
const router = express.Router();
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, vendor } from '../middleware/authMiddleware.js';

// Student & Vendor routes
router.post('/', protect, createOrder); // Any logged-in user can create an order
router.get('/my-orders', protect, getMyOrders); // Gets orders for the logged-in user (student or vendor)
router.get('/:id', protect, getOrderById); // Student or vendor can get a specific order

// Vendor-only routes
router.put('/:id/status', protect, vendor, updateOrderStatus);

export default router;