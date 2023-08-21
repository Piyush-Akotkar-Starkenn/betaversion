const express = require("express");
const ATController = require("../../controllers/admin/analyticsthresholdController");
const ATRouter = express.Router();

// Analytics Threshold Routes //
ATRouter.post("/add-AnalyticsThresholds/:user_uuid",ATController.addAnalyticsThreshold);

// Get Customers By ID
ATRouter.get("/get-AnalyticsThresholds-ById/:threshold_uuid", ATController.getByIdAnalyticsThresholds);

// Get Analytics Threshold Routes //
ATRouter.get("/get-AnalyticsThresholds", ATController.getAnalyticsThreshold);

// Update Analytics Threshold Routes //
ATRouter.put("/update-AnalyticsThresholds/:threshold_uuid",ATController.updateAnalyticsThresholds);

// Delete Analytics Threshold Routes //
ATRouter.put("/delete-AnalyticsThresholds/:threshold_uuid",ATController.deleteAnalyticsThresholds);



module.exports = { ATRouter };