const { User, Company } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.updatePushToken = async (req, res) => {
  const expoPushToken = req.body.expoPushToken;
  console.log("Updating push token for user: ", req.user.id); // Log userId
  console.log("New Expo Push Token: ", expoPushToken); // Log the new push token

  try {
    const user = await User.findById(req.user.id);
    user.expoPushToken = expoPushToken;
    await user.save();

    res.status(200).json({ message: "Push token updated successfully" });
  } catch (error) {
    console.error("Error updating push token:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.register = async (req, res) => {
  console.log("asdasdas");
  const { email, username, password, phone, role, companyName, expoPushToken } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (role === "company") {
      // Şirket ise Company modelini kullanarak kaydedin
      newUser = new Company({
        email,
        username,
        password: hashedPassword,
        phone,
        role,
        companyName,
        expoPushToken,
      });
    } else {
      newUser = new User({
        email,
        username,
        password: hashedPassword,
        phone,
        role,
        expoPushToken,
      });
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  console.log("log");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password not correct" });
    }
    console.log("role", user.role);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      token,
      userId: user._id,
      role: user.role,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// authController.js
exports.verifyToken = async (req, res) => {
  console.log("verify");
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
