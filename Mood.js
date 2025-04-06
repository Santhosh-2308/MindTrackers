const express = require("express");
const Mood = require("../models/Mood");
const router = express.Router();

router.post("/log", async (req, res) => {
  const { userId, text, mood, score } = req.body;
  const newMood = new Mood({ userId, text, mood, score });
  await newMood.save();
  res.json({ success: true });
});

router.get("/at-risk", async (req, res) => {
  const negativeMoods = await Mood.find({ mood: "negative" });
  res.json(negativeMoods);
});

module.exports = router;
