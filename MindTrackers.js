// Folder Structure Overview:
// /client - React frontend
// /server - Node.js backend
// /ml-api - Flask sentiment analysis API

// ==============================
// /client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MoodLog from "./pages/MoodLog";
import Login from "./pages/Login";
import CounselorPanel from "./pages/CounselorPanel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/log" element={<MoodLog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/counselor" element={<CounselorPanel />} />
      </Routes>
    </Router>
  );
}

// ==============================
// /client/src/pages/Dashboard.jsx
import React from "react";
export default function Dashboard() {
  return <div className="p-4">Welcome to MindTrack Dashboard</div>;
}

// ==============================
// /client/src/pages/MoodLog.jsx
import React, { useState } from "react";
import axios from "axios";

export default function MoodLog() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/analyze", { text });
    setResult(res.data);
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border"
        rows="4"
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white" onClick={handleSubmit}>
        Analyze Mood
      </button>
      {result && (
        <div className="mt-4">
          <p>Mood: {result.mood}</p>
          <p>Score: {result.score}</p>
        </div>
      )}
    </div>
  );
}

// ==============================
// /client/src/pages/Login.jsx
import React from "react";
export default function Login() {
  return <div className="p-4">Login Page (to be implemented)</div>;
}

// ==============================
// /client/src/pages/CounselorPanel.jsx
import React from "react";
export default function CounselorPanel() {
  return <div className="p-4">Counselor Dashboard (students at risk)</div>;
}

// ==============================
// /server/index.js
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

// ==============================
// /server/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["student", "counselor"], default: "student" },
});

module.exports = mongoose.model("User", UserSchema);

// ==============================
// /server/models/Mood.js
const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: String,
  text: String,
  mood: String,
  score: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mood", MoodSchema);

// ==============================
// /server/routes/auth.js
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

// ==============================
// /server/routes/mood.js
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

// ==============================
// /server/routes/analysis.js
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

// ==============================
// /ml-api/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data['text']
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    mood = "positive" if polarity > 0 else "negative" if polarity < 0 else "neutral"
    return jsonify({"mood": mood, "score": polarity})

if __name__ == '__main__':
    app.run(port=5001)

// ==============================
// /README.md (summary)
# MindTrack – AI-Powered Student Wellness Tracker

## Stack
- React + Tailwind (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database)
- Flask + TextBlob (AI Sentiment Analysis)

## Start Instructions
1. Run MongoDB Atlas or local Mongo.
2. `cd ml-api && pip install flask flask-cors textblob && python app.py`
3. `cd server && npm install && node index.js`
4. `cd client && npm install && npm start`

Ensure `.env` has `MONGO_URI` for backend.

---
