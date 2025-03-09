const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /api/users/email/:email
router.get("/email/:email", userController.getUserByEmail);

module.exports = router;
