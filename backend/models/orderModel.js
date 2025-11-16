import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Vendor is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Prod',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
      },
    ],
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;