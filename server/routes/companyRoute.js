const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authMiddleware = require("../middleware"); // Auth middleware'inizi buraya ekleyin
const upload = require("../utils/multer");

router.get("/profile", authMiddleware, companyController.getCompany);
router.put(
  "/profile",
  authMiddleware,
  upload.single("photo"),
  companyController.updateCompany
);
module.exports = router;
