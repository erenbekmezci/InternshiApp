const mongoose = require("../db/db");
const { Schema } = mongoose;
const advertSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  context: { type: String, required: true },
  skills: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  acceptText: { type: String, required: true },
  rejectText: { type: String, required: true },
  applicationCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
