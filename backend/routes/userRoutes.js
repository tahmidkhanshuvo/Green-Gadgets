const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /api/users/email/:email
router.get(
  "/email/:email",
  require("../middleware/authMiddleware"),
  userController.getUserByEmail,
);

module.exports = router;
