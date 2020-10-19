const { urlencoded } = require("body-parser");
const express = require("express");
const multer = require("multer");
const path = require("path");

uploadController = express();

const videoStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + Date.now() + ext);
  },
  destination: function (req, name, cb) {
    cb(null, "assets/");
  },
});

videoPath = multer({
  fileFilter: function (req, file, cb) {
    file.mimetype === "video/mp4"
      ? cb(null, true)
      : cb(new Error("mime type not recognizerd"), false);
  },
  storage: videoStorage,
});

uploadController
  .get("/", (req, res) => {
    res.render("upload/upload");
  })
  .post("/", videoPath.single("video"), (req, res) => {
    res.redirect("/watching/" + req.file.filename);
  });

module.exports = uploadController;
