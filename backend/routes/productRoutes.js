import express from 'express';
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, vendor } from '../middleware/authMiddleware.js';

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Vendor-only routes
router.post('/', protect, vendor, createProduct); // must be logged in and be a vendor
router.put('/:id', protect, vendor, updateProduct);
router.delete('/:id', protect, vendor, deleteProduct);

export default router;