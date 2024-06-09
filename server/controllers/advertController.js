const Advert = require("../models/adverts");
const Application = require("../models/applications");
exports.createAdvert = async (req, res) => {
  console.log("asdasd");
  const {
    title,
    context,
    skills,
    startDate,
    endDate,
    location,
    acceptText,
    rejectText,
  } = req.body;
  const companyId = req.user.id; // Middleware'den gelen user ID

  const newAdvert = new Advert({
    companyId,
    title,
    context,
    skills,
    startDate,
    endDate,
    location,
    acceptText,
    rejectText,
  });

  try {
    const savedAdvert = await newAdvert.save();
    res.status(201).json(savedAdvert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find({ companyId: req.user.id }); // Şirketin ilanlarını alır
    res.status(200).json(adverts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdvertsById = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    res.status(200).json(advert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    if (advert.companyId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Application.deleteMany({ advertId: req.params.id });

    await Advert.findByIdAndDelete(req.params.id); // İlanı silin

    res.status(200).json({
      message: "Advert and related applications deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAdvert = async (req, res) => {
  const advertId = req.params.id;
  const updateData = req.body;

  try {
    const updatedAdvert = await Advert.findByIdAndUpdate(advertId, updateData, {
      new: true,
    });
    if (!updatedAdvert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    res.status(200).json(updatedAdvert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find().populate(
      "companyId",
      "username photo"
    );
    res.status(200).json(adverts);
  } catch (error) {
    console.error("Error fetching adverts:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.applyToAdvert = async (req, res) => {
  const advertId = req.params.id;
  const userId = req.user.id;

  try {
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    // Başvurunun daha önce yapılıp yapılmadığını kontrol et
    const existingApplication = await Application.findOne({ advertId, userId });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied to this advert" });
    }

    const newApplication = new Application({
      advertId,
      userId,
      status: "pending",
    });

    advert.applicationCount += 1;
    await advert.save();
    await newApplication.save();

    res.status(200).json({ message: "Application successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
