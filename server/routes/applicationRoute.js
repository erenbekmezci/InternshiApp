const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware");

router.get("/user", authMiddleware, applicationController.getUserApplications);
router.get("/myapp", authMiddleware, applicationController.getMyApplications);

module.exports = router;
