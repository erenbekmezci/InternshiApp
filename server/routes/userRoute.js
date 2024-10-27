const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware");
const upload = require("../utils/multer");

const router = express.Router();

router.get("/", authMiddleware, userController.getUser); // Middleware'i burada kullanıyoruz
router.put('/', authMiddleware, upload.single('photo'), userController.updateUser);


module.exports = router;
