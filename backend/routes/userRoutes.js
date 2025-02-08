const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a single user by Email
router.get('/search/email', userController.getUserById);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update an existing user by Email
router.put('/search/email', userController.updateUser);

// Route to delete a user by Email
router.delete('/search/email', userController.deleteUser);

// Route to search for a user by Email
router.get('/search/email', userController.getUserByEmail);

module.exports = router;