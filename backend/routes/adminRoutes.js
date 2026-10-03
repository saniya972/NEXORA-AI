const express = require("express");

const {
    getDashboardStats,
    getSupportAnalytics
} = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", getDashboardStats);

router.get("/analytics", getSupportAnalytics);

module.exports = router;