import express from "express";
import SeriesController from "../controllers/MobileSeries.mjs";

const router = express.Router();

// CRUD routes
router.post("/", SeriesController.createSeries); // Create
router.get("/", SeriesController.getAllSeries); // Read All
router.get("/:id", SeriesController.getSeriesById); // Read One
router.put("/:id", SeriesController.updateSeries); // Update
router.delete("/:id", SeriesController.deleteSeries); // Delete

export default router;
