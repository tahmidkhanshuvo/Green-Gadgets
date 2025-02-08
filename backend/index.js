// index.js
const express = require('express');
const users = require('./data'); // Import the simulated database (data.js)

const app = express();
const port = 4000;

// Middleware to parse JSON data
app.use(express.json());

// Simple Test Route
app.get('/', (req, res) => {
    res.send('API is working 🚀');
});

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
