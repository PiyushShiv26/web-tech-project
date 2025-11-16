import asyncHandler from 'express-async-handler';
import Prod from '../models/prodModel.js';

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Vendor
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, tags } = req.body;

  const product = new Prod({
    owner: req.user._id, // from 'protect' middleware
    name,
    description,
    price,
    stock,
    tags,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Get all products (for public browsing)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Prod.find({}).populate('owner', 'name'); // Show owner's name
  res.json(products);
});

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Prod.findById(req.params.id).populate('owner', 'name');
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Vendor
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, tags } = req.body;

  const product = await Prod.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if the logged-in user is the owner
  if (product.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this product');
  }

  // Update fields
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.tags = tags || product.tags;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Vendor
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Prod.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if the logged-in user is the owner
  if (product.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this product');
  }

  await product.deleteOne(); // Use deleteOne()
  res.json({ message: 'Product removed' });
});

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};