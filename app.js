// Importing modules
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");

// Custom Controllers/modules
const videoController = require("./controllers/video/videocontroller");
const uploadController = require("./controllers/upload/uploadcontrollers");

//initialize db connection
const connection = require("./connection");
connection();

//Initialization as per docs for modules
const urlparser = bodyparser.urlencoded({ extended: false });
app.use("/assets",express.static(path.join(__dirname,"assets")));
app.set("view engine", "ejs");
app.use(urlparser);
app.use("/", videoController);
app.use("/upload", uploadController);

// for 404
app.use( (req,res,next)=>{
    var err = new Error("Not found");
    err.status = 404;
    next(err);
})

//for 500
app.use((err,req,res,next)=>{
    res.status = err.status || 500;
    res.render("error.ejs",{err, url:req.url})
})

app.listen(3000, () => console.log("Listening to port " + 3000));
