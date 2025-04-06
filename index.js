
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const analysisRoutes = require("./routes/analysis");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/analyze", analysisRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));