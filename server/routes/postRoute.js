const express = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware");

const router = express.Router();

router.post("/", authMiddleware, postController.createPost);
router.get("/", postController.getPosts);
router.get("/user", authMiddleware, postController.getUserPosts);
router.post("/:postId/like", authMiddleware, postController.likePost);
router.get("/:postId/likes", postController.getLikes);
router.post("/:postId/comments", authMiddleware, postController.addComment);
router.get("/:postId/comments", postController.getComments);

module.exports = router;
