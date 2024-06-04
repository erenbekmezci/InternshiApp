const Application = require("../models/applications");
const Advert = require("../models/adverts");
const { User } = require("../models/user");

exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.id,
    }).populate("advertId", "title companyId location");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.id,
    }).select("advertId userId status createdAt");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "advertId"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationsByAdvert = async (req, res) => {
  const { advertId } = req.params;

  try {
    const applications = await Application.find({
      advertId,
      //status: "pending",
    }).populate("userId");

    if (!applications) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicantProfile = async (req, res) => {
  const { applicantId, applicationId } = req.params;

  try {
    const applicant = await User.findById(applicantId);
    const application = await Application.findById(applicationId).populate(
      "userId"
    );

    if (!applicant || !application) {
      return res
        .status(404)
        .json({ message: "Applicant or Application not found" });
    }

    res.status(200).json({ applicant, application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const { sendPushNotification } = require("../utils/notifications");

exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    const user = await User.findById(application.userId);

    if (user && user.expoPushToken) {
      const title = "Application Status Updated";
      const body = `Your application has been ${status}.`;

      await sendPushNotification(user.expoPushToken, title, body);
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: error.message });
  }
};
