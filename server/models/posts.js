const mongoose = require("../db/db");
const { Schema } = mongoose;

const postSchema = new Schema({
  username: String,
  title: String,
  content: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
