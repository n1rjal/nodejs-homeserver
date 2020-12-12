const express = require("express");
const multer = require("multer");
const path = require("path");

const videoModel = require("../../models/videomodel");


uploadController = express();

const videoStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + Date.now().toString() + ext);
  },
  destination: function (req, name, cb) {
    
    var ext = path.extname(name.originalname);
    
    if (ext == ".mp4"){
      cb(null, "assets/videos");
    }
    else{
      cb(null, "assets/thumbnails");
    }

  },
});


const videoPath = multer({
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    
    // known extensions are 
    var exts = [".webp",".png",".jpg",".jpeg"]
    if (exts.includes(ext)) {
      cb(null,file.fieldname + Date.now().toString() + ext)
      return 
    }
      
    file.mimetype === "video/mp4"
      ? cb(null, true)
      : cb(new Error("mime type not recognizerd"), false);
  },
  storage: videoStorage,
});


uploadController
  .get("/", (req, res) => {
    res.render("upload/upload",{ "title":"Upload your video" });
  })
  .post("/", videoPath.fields([
    { name: "thumbnail", maxCount:1},
    { name: "video", maxCount:1}
  ]),
    async (req, res,next) => {

      try{
        const videoUpload = req.files.video[0];
        const thumbnail = req.files.thumbnail[0];
        
        const tags = req.body.tags.split(",");7
        

        const videoInstance = new videoModel({
          title: req.body.name,
          desp: req.body.desp,
          tags: tags,
          videoPath: videoUpload.path,
          thumbnailPath: thumbnail.path
        })
        var video = await videoInstance.save()

        

        res.send({video});
      }catch(e){
        next( new Error(e.message))
      }
  });

module.exports = uploadController;
