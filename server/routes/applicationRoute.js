const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware");

router.get("/user", authMiddleware, applicationController.getUserApplications);
router.get("/myapp", authMiddleware, applicationController.getMyApplications);
router.get("/advert/:advertId", applicationController.getApplicationsByAdvert);
router.get("/:id", authMiddleware, applicationController.getApplicationById);

router.get(
  "/profile/:applicantId/:applicationId",
  applicationController.getApplicantProfile
);
router.put(
  "/status/:applicationId",
  applicationController.updateApplicationStatus
);

module.exports = router;
