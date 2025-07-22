
require('dotenv').config();
const express = require('express');
const fs = require('fs');       
const path = require('path');
const cors = require('cors');

const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

// Middleware to parse JSON requests
app.use(express.json());

app.use(cookieParser());
// Allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:5173',// your frontend URL
   credentials: true // if you use cookies/auth
}));
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, )
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Import all route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // New

// Use routes with base paths
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});
app.use('/uploads', express.static('uploads'));

// Create upload folders if they don't exist
const uploadDirs = [
  path.join(__dirname, 'uploads/thumbnails'),
  path.join(__dirname, 'uploads/videos'),
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
