const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboard.controller");
const { requireAuth } = require("../middlewares/auth");

const dashboardController = new DashboardController();

router.get("/", requireAuth, (req, res, next) =>
  dashboardController.getDashboardData(req, res, next)
);

module.exports = router;
