
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