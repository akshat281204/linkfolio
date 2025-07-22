const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Core Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/profile', require('./routes/profile'));

// --- Serve Frontend ---
// This must be after all API routes
if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the React app build folder
    app.use(express.static(path.join(__dirname, '../client/build')));

    // For any request that doesn't match an API route, send back the React app's index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});