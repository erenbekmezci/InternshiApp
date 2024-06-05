const Post = require("../models/posts");
const { wss, WebSocket } = require("../utils/websocket"); // WebSocket modülünü içe aktarın

exports.createPost = async (req, res) => {
  const { username, title, content } = req.body;

  const newPost = new Post({
    username,
    title,
    content,
  });

  try {
    await newPost.save();

    // Yeni post oluşturulduğunda tüm bağlantılara gönderin
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newPost));
      }
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error); // Hatanın konsola loglanması
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting posts:", error); // Hatanın konsola loglanması
    res.status(500).json({ message: "Internal server error" });
  }
};
