const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware");

// Public routes
router.put(
  "/update-push-token",
  authMiddleware,
  authController.updatePushToken
);
router.post("/register", authController.register);
router.post("/login", authController.login);
// authRoute.js
router.get("/verifyToken", authController.verifyToken);

module.exports = router;
