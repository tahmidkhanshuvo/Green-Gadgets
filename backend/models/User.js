const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    location: { type: String, default: "" }, // Optional field
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
