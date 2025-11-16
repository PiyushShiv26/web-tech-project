import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (Student)
const createOrder = asyncHandler(async (req, res) => {
  const { items, totalPrice, vendorId } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    studentId: req.user._id, // Logged-in user is the student
    vendorId,
    items,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get an order by its ID
// @route   GET /api/orders/:id
// @access  Private (Student or Vendor)
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('studentId', 'name email')
    .populate('vendorId', 'name email')
    .populate('items.product', 'name price'); // get product name and price

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // check if the logged-in user is either the student or vendor
  if (
    order.studentId._id.toString() !== req.user._id.toString() &&
    order.vendorId._id.toString() !== req.user._id.toString()
  ) {
    res.status(401);
    throw new Error('Not authorized to view this order');
  }

  res.json(order);
});

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders/my-orders
// @access  Private (Student or Vendor)
const getMyOrders = asyncHandler(async (req, res) => {
  let orders;
  
  if (req.user.role === 'vendor') {
    // vendor: Find orders where they are the vendor
    orders = await Order.find({ vendorId: req.user._id }).populate('studentId', 'name');
  } else {
    // student: Find orders where they are the student
    orders = await Order.find({ studentId: req.user._id }).populate('vendorId', 'name');
  }
  
  res.json(orders);
});

// @desc    Update order status (e.g., to 'Completed')
// @route   PUT /api/orders/:id/status
// @access  Private (Vendor)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check if the logged-in user is the vendor for this order
  if (order.vendorId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this order');
  }

  // Update the status from the request body
  order.status = req.body.status || order.status;

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export { createOrder, getOrderById, getMyOrders, updateOrderStatus };