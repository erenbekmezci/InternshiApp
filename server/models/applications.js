const mongoose = require("../db/db");
const { Schema } = mongoose;
const applicationSchema = new Schema({
  advertId: { type: Schema.Types.ObjectId, ref: "Advert", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
