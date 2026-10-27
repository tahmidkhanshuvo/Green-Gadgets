const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ad" }],
});

UserSchema.set("toJSON", {
  transform: (_doc, result) => {
    delete result.password;
    return result;
  },
});
module.exports = mongoose.model("User", UserSchema);
