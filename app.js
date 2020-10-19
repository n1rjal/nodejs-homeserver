// Importing modules
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

// Custom Controllers/modules
const videoController = require("./controllers/video/videocontroller");
const uploadController = require("./controllers/upload/uploadcontrollers");

//initialize db connection
const connection = require("./connection");
connection();

//Initialization as per docs for modules
const urlparser = bodyparser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(urlparser);
app.use("/", videoController);
app.use("/upload", uploadController);

app.listen(3000, () => console.log("Listening to port " + 3000));
