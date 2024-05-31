const express = require("express");
const router = express.Router();
const advertController = require("../controllers/advertController");
const authMiddleware = require("../middleware");

router.post("/", authMiddleware, advertController.createAdvert);
router.get("/", authMiddleware, advertController.getAdverts);
router.get("/:id", authMiddleware, advertController.getAdvertsById);
router.delete("/:id", authMiddleware, advertController.deleteAdvert);
router.put("/:id", authMiddleware, advertController.updateAdvert);

router.get("/all/5", advertController.getAllAdverts);
router.post("/apply/:id", authMiddleware, advertController.applyToAdvert);

module.exports = router;
