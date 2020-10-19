const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    path: { type: String, required: true },
    desp: { type: String, required: true },
    uploadedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const video = mongoose.model("video", videoSchema);

module.exports = video;
