const express = require("express");

const {
    classifyIssue,
     chatbot,
     analyzeSentiment
} = require("../controllers/aiController");

const router = express.Router();

router.post("/classify", classifyIssue);

router.post("/chat", chatbot);

router.post("/sentiment", analyzeSentiment);

module.exports = router;