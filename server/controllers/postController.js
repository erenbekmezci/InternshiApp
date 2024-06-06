const Post = require("../models/posts");
const User = require("../models/user");
const { wss, WebSocket } = require("../utils/websocket");

exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .populate("likes", "username photo")
      .populate("comments.user", "username photo"); // comments.user alanını doldurmak için

    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Post oluşturma
exports.createPost = async (req, res) => {
  const { username, title, content } = req.body;
  const userId = req.user.id; // Oturum açmış kullanıcının ID'si

  const newPost = new Post({
    userId, // userId alanını ekle
    username,
    title,
    content,
  });

  try {
    await newPost.save();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newPost));
      }
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Postları getirme
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username photo") // Ensure user field is populated with username and photo
      .populate("likes", "username photo")
      .populate("comments.user", "username photo")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Post beğenme
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();

      const updatedPost = await Post.findById(post._id)
        .populate("likes", "username photo")
        .populate("comments.user", "username photo");

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(updatedPost));
        }
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Beğenenleri getirme
exports.getLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "likes",
      "username photo"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.likes);
  } catch (error) {
    console.error("Error getting likes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Yorum ekleme
exports.addComment = async (req, res) => {
  try {
    console.log("asdas");
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      user: req.user.id,
      text: req.body.comment,
    };
    console.log("asdas");

    post.comments.push(comment);
    await post.save();
    console.log("3");

    const updatedPost = await Post.findById(post._id)
      .populate("likes", "username photo")
      .populate("comments.user", "username photo");

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(updatedPost));
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Yorumları getirme
exports.getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "comments.user",
      "username photo"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
