const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authMiddleware = require("../middleware"); // Auth middleware'inizi buraya ekleyin

// Şirket profilini alma rotası
router.get("/profile", authMiddleware, companyController.getCompany);

// Şirket profilini güncelleme rotası
router.put("/profile", authMiddleware, companyController.updateCompany);

module.exports = router;
