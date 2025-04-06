
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