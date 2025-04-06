const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5001/analyze", {
      text: req.body.text,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Sentiment service failed" });
  }
});

module.exports = router;
