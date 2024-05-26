const mongoose = require("mongoose");

require("dotenv").config();
const connection = process.env.MONGO_URI;
mongoose
  .connect(connection)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

module.exports = mongoose;
