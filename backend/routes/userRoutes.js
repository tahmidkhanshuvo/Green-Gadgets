const express = require('express');
const userController = require('../controllers/userController'); // Ensure this path is correct

const router = express.Router();

// Check if all functions exist
if (!userController.getAllUsers) console.error('❌ getAllUsers is undefined');
if (!userController.getUserByEmail) console.error('❌ getUserByEmail is undefined');
if (!userController.createUser) console.error('❌ createUser is undefined');
if (!userController.updateUser) console.error('❌ updateUser is undefined');
if (!userController.deleteUser) console.error('❌ deleteUser is undefined');

// Define routes
router.get('/', userController.getAllUsers);
router.get('/by-email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;
