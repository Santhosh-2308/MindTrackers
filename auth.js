const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });
  const token = jwt.sign({ id: user._id, role: user.role }, "secret");
  res.json({ token });
});

module.exports = router;