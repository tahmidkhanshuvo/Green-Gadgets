const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Simple Test Route
app.get('/', (req, res) => {
    res.send('API is working 🚀');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB Connection Error:', error.message));

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
