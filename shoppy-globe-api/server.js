const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');

// Use Routes
app.use('/api', authRoutes);       // Register/Login
app.use('/api/products', productRoutes); // Product listing
app.use('/api/cart', cartRoutes);  // Cart operations

// Root Route
app.get('/', (req, res) => {
  res.send('ShoppyGlobe API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});