const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,unique: true},
    videoPath: { type: String, required: true },
    thumbnailPath: { type: String, required: true },
    desp: { type: String, required: true },
    tags: [{
      type: String,
      required: true
    }],
  },
  { timestamps: true }
);

const video = mongoose.model("video", videoSchema);

module.exports = video;
