const MobileBrand = require("../models/Brands");

class BrandController {
  // Create a new brand
  async createBrand(req, res) {
    try {
        const FilePath=req.file.path
      const { Name } = req.body;

      const newBrand = new MobileBrand({ Name, FilePath });
      const savedBrand = await newBrand.save();

      res.status(201).json({ success: true, data: savedBrand });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get all brands
  async getAllBrands(req, res) {
    try {
      const brands = await MobileBrand.find();
      res.status(200).json({ success: true, data: brands });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get a brand by ID
  async getBrandById(req, res) {
    try {
      const { id } = req.params;

      const brand = await MobileBrand.findById(id);
      if (!brand) {
        return res.status(404).json({ success: false, message: "Brand not found" });
      }

      res.status(200).json({ success: true, data: brand });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update a brand
  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const FilePath=req.file.path
      const { Name } = req.body;

      const updatedBrand = await MobileBrand.findByIdAndUpdate(
        id,
        { Name, FilePath },
        { new: true, runValidators: true }
      );

      if (!updatedBrand) {
        return res.status(404).json({ success: false, message: "Brand not found" });
      }

      res.status(200).json({ success: true, data: updatedBrand });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete a brand
  async deleteBrand(req, res) {
    try {
      const { id } = req.params;

      const deletedBrand = await MobileBrand.findByIdAndDelete(id);

      if (!deletedBrand) {
        return res.status(404).json({ success: false, message: "Brand not found" });
      }

      res.status(200).json({ success: true, message: "Brand deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

// Export an instance of the class
module.exports = new BrandController();
