import { MobileSeries } from "../models/MobileSeries.js";

class SeriesController {
  // Create a new series
  async createSeries(req, res) {
    try {
      const { Name } = req.body;

      const newSeries = new MobileSeries({ Name });
      const savedSeries = await newSeries.save();

      res.status(201).json({ success: true, data: savedSeries });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get all series
  async getAllSeries(req, res) {
    try {
      const series = await MobileSeries.find();
      res.status(200).json({ success: true, data: series });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get a single series by ID
  async getSeriesById(req, res) {
    try {
      const { id } = req.params;

      const series = await MobileSeries.findById(id);
      if (!series) {
        return res.status(404).json({ success: false, message: "Series not found" });
      }

      res.status(200).json({ success: true, data: series });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update a series
  async updateSeries(req, res) {
    try {
      const { id } = req.params;
      const { Name } = req.body;

      const updatedSeries = await MobileSeries.findByIdAndUpdate(
        id,
        { Name },
        { new: true, runValidators: true }
      );

      if (!updatedSeries) {
        return res.status(404).json({ success: false, message: "Series not found" });
      }

      res.status(200).json({ success: true, data: updatedSeries });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete a series
  async deleteSeries(req, res) {
    try {
      const { id } = req.params;

      const deletedSeries = await MobileSeries.findByIdAndDelete(id);

      if (!deletedSeries) {
        return res.status(404).json({ success: false, message: "Series not found" });
      }

      res.status(200).json({ success: true, message: "Series deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

// Export an instance of the controller
export default new SeriesController();
