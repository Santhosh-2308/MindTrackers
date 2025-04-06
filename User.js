
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["student", "counselor"], default: "student" },
});

module.exports = mongoose.model("User", UserSchema);