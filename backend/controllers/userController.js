import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Prod from '../models/prodModel.js';

// @desc    Get all vendors
// @route   GET /api/users/vendors
// @access  Public
const getVendors = asyncHandler(async (req, res) => {
  // Find all users where the role is 'vendor'
  // We only select their ID and name to send to the frontend
  const vendors = await User.find({ role: 'vendor' }).select('_id name');
  res.json(vendors);
});

// @desc    Get a single vendor's store (details + products)
// @route   GET /api/users/store/:vendorId
// @access  Public
const getVendorStore = asyncHandler(async (req, res) => {
  // find the vendor by their ID
  const vendor = await User.findById(req.params.vendorId).select('name');
  
  if (!vendor) {
    res.status(404);
    throw new Error('Vendor not found');
  }

  // find all products owned by that vendor
  const products = await Prod.find({ owner: req.params.vendorId });

  // send both back to the frontend
  res.json({ vendor, products });
});

export { getVendors, getVendorStore };