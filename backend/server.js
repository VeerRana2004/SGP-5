const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // Removed deprecated options
  serverSelectionTimeoutMS: 60000 
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
