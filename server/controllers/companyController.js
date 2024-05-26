const { Company } = require("../models/user");

module.exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.user.id); // Middleware'den gelen userId'yi kullanıyoruz

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching company data" });
  }
};

module.exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating company data" });
  }
};
