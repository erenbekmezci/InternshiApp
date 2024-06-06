const { Company } = require("../models/user");

// Fetch company profile
module.exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.user.id); // Middleware'den gelen userId'yi kullanıyoruz

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching company data" });
  }
};

// Update company profile
module.exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.user.id);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Update the fields
    company.companyName = req.body.companyName || company.companyName;
    company.email = req.body.email || company.email;
    company.phone = req.body.phone || company.phone;
    company.companyDetails = req.body.companyDetails || company.companyDetails;
    company.location = req.body.location || company.location;

    // Handle file upload for photo
    if (req.file) {
      company.photo = req.file.filename;
    }

    await company.save();

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating company data" });
  }
};
