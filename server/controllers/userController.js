const {User} = require("../models/user");

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Middleware'den gelen userId'yi kullanıyoruz

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
};

module.exports.updateUser = async (req, res) => {
  console.log("sasd");

  try {
    console.log("sasd")

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    console.log("sasd");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating user data" });
  }
};
