import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './lib/db.js';
import { users, products } from './data/sampleData.js';
import User from './models/userModel.js';
import Prod from './models/prodModel.js';
import Order from './models/orderModel.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // clear all existing data
    await Order.deleteMany();
    await Prod.deleteMany();
    await User.deleteMany();

    console.log('Data cleared...');

    // hash passwords for sample users
    const createdUsers = await User.insertMany(
      users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10), // Hash password
      }))
    );
    
    // get the IDs of the vendors we just created
    const vendorUsers = createdUsers.filter(user => user.role === 'vendor');
    const vendor1Id = vendorUsers[0]._id;
    const vendor2Id = vendorUsers[1]._id;

    // add owner IDs to the sample products
    const sampleProducts = products.map((product, index) => {
      return {
        ...product,
        // Assign first two products to vendor 1, next two to vendor 2
        owner: index < 2 ? vendor1Id : vendor2Id, 
      };
    });

    // insert the products
    await Prod.insertMany(sampleProducts);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Prod.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command-line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}