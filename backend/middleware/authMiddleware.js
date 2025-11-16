import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// generating a token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Middleware to protect routes (check if user is logged in)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (but not the password)
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401); // Not authorized
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to check if user is a vendor
const vendor = (req, res, next) => {
  if (req.user && req.user.role === 'vendor') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a vendor');
  }
};

export { generateToken, protect, vendor };