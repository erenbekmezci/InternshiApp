const mongoose = require("../db/db");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, default: 'default_profile.jpg' },
    role: { type: String, enum: ["user", "company"], required: true },
    phone: { type: String },
    resume: { type: String },
    education: { type: String },
    location: { type: String },
    expoPushToken: { type: String }, // Yeni alan eklendi
  },
  { discriminatorKey: "role", timestamps: true }
);

const User = mongoose.model("User", userSchema);

const companySchema = new Schema({
  companyName: { type: String, required: true },
  companyDetails: { type: String },
});

const Company = User.discriminator("company", companySchema);

module.exports = { User, Company };
