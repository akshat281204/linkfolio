const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/profile', require('./routes/profile'));

// --- Serve Frontend ---
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//   });
// }

// Start the server for local development
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected successfully.');
      app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected (production mode).'))
    .catch(err => console.error('MongoDB connection error:', err));
}


// Export the app for Vercel
module.exports = app;