const MobileModel = require("../models/MobileModel");

class MobileController {
  // Create a new mobile entry
  static async createMobile(req, res) {
    try {
      const { Name } = req.body;
      // Create a new MobileModel document
      const image=req.file.path;
      const mobile = new MobileModel({ image, Name });
      const savedMobile = await mobile.save();

      res.status(201).json({ success: true, data: savedMobile });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get all mobiles
  static async getAllMobiles(req, res) {
    try {
      const mobiles = await MobileModel.find();
      res.status(200).json({ success: true, data: mobiles });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get a single mobile by ID
  static async getMobileById(req, res) {
    try {
      const { id } = req.params;

      const mobile = await MobileModel.findById(id);
      if (!mobile) {
        return res.status(404).json({ success: false, message: "Mobile not found" });
      }

      res.status(200).json({ success: true, data: mobile });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update a mobile entry
  static async updateMobile(req, res) {
    try {
      const { id } = req.params;
      const image=req.file.path
      const { Name } = req.body;

      const updatedMobile = await MobileModel.findByIdAndUpdate(
        id,
        { image, Name },
        { new: true, runValidators: true }
      );

      if (!updatedMobile) {
        return res.status(404).json({ success: false, message: "Mobile not found" });
      }

      res.status(200).json({ success: true, data: updatedMobile });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete a mobile entry
  static async deleteMobile(req, res) {
    try {
      const { id } = req.params;

      const deletedMobile = await MobileModel.findByIdAndDelete(id);

      if (!deletedMobile) {
        return res.status(404).json({ success: false, message: "Mobile not found" });
      }

      res.status(200).json({ success: true, message: "Mobile deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new MobileController();
