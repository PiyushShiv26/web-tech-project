// hash passwords in the seeder script, so store plain text here
export const users = [
  {
    name: 'Alice Student',
    email: 'alice@test.com',
    phone: '1111111111',
    password: 'password123',
    role: 'student',
  },
  {
    name: 'Bob Vendor',
    email: 'bob@test.com',
    phone: '2222222222',
    password: 'password123',
    role: 'vendor',
  },
  {
    name: 'Charlie Vendor',
    email: 'charlie@test.com',
    phone: '3333333333',
    password: 'password123',
    role: 'vendor',
  },
];

// We'll add the 'owner' field in the seeder script
export const products = [
  {
    name: 'Used Textbook',
    description: 'Barely used, 10th edition',
    price: 45.00,
    stock: 1,
  },
  {
    name: 'Class Notes (PDF)',
    description: 'Complete notes for CS241',
    price: 10.00,
    stock: 50,
  },
  {
    name: 'Homemade Cookies (6-pack)',
    description: 'Freshly baked chocolate chip',
    price: 8.00,
    stock: 10,
  },
  {
    name: 'LED Desk Lamp',
    description: 'White, 3 brightness levels',
    price: 15.00,
    stock: 5,
  },
];