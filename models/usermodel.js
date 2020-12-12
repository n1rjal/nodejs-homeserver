const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 8 },
    password: { type: String, required: true },
    videos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"video"
    }]
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
