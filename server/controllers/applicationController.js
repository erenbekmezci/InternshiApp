const Application = require("../models/applications");
const Advert = require("../models/adverts");

exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch applications for the logged-in user
    const applications = await Application.find({ userId }).populate(
      "advertId"
    );

    // Populate the advert data
    const applicationsWithAdverts = applications.map((app) => ({
      id: app._id,
      status: app.status,
      createdAt: app.createdAt,
      advert: app.advertId,
    }));

    res.status(200).json(applicationsWithAdverts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).populate("advertId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other application-related methods can go here (e.g., applyToAdvert, getApplicationById, etc.)
