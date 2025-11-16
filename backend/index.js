import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './lib/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import route files
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

// api Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount your routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);