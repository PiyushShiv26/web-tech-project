import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      maxlength: 150,
      required: [true, 'A short description is needed'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Prod = mongoose.model('Prod', prodSchema);
export default Prod;