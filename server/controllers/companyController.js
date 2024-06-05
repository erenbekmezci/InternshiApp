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
    const company = await Company.findById(req.user.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const { username, email, phone, companyDetails, location, companyName } =
      req.body;
    company.username = username || company.username;
    company.email = email || company.email;
    company.phone = phone || company.phone;
    company.companyDetails = companyDetails || company.companyDetails;
    company.location = location || company.location;
    company.companyName = companyName || company.companyName;

    // Handle photo upload
    if (req.file) {
      company.photo = req.file.filename;
    }

    await company.save();
    res.status(200).json(company);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating company data" });
  }
};
