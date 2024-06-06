const mongoose = require("../db/db");
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User"}, // Add userId reference
  username: String,
  title: String,
  content: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
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
