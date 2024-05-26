const mongoose = require("../db/db");

const userSchema = new mongoose.Schema({

email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["company", "student"],
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  resume: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
