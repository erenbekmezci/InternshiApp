const mongoose = require("../db/db");
const { Schema } = mongoose;

const postSchema = new Schema({
  username: String,
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
