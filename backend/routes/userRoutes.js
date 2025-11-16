import express from 'express';
const router = express.Router();

import { getVendors, getVendorStore } from '../controllers/userController.js';

router.get('/vendors', getVendors);
router.get('/store/:vendorId', getVendorStore); 

export default router;