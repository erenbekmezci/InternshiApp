const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
//const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
// authRoute.js
router.get("/verifyToken", authController.verifyToken);
router.put("/update-push-token", authController.updatePushToken);

module.exports = router;
