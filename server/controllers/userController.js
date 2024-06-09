const { User } = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body }; // req.body'yi kopyalayarak başlatın

    if (req.file) {
      const user = await User.findById(req.user.id);

      if (user.photo && user.photo !== "default_profile.jpg") {
        fs.unlinkSync(path.join(__dirname, "..", "uploads", user.photo));
      }
      updateData.photo = req.file.filename; // Yeni dosya adını ayarlayın
    } else if (req.body.photo === "default_profile.jpg") {
      const user = await User.findById(req.user.id);

      if (user.photo && user.photo !== "default_profile.jpg") {
        fs.unlinkSync(path.join(__dirname, "..", "uploads", user.photo));
      }
      updateData.photo = "default_profile.jpg"; // Fotoğrafı varsayılan olarak ayarlayın
    } else {
      delete updateData.photo; // photo alanını silin, böylece yanlış değer gönderilmez
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occurred while updating user data" });
  }
};