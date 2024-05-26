const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware");

const router = express.Router();

router.get("/", authMiddleware, userController.getUser); // Middleware'i burada kullanıyoruz
router.put("/", authMiddleware, userController.updateUser); // Middleware'i burada kullanıyoruz

module.exports = router;
