const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  //this will read the files in assets folder
  const assets = fs.readdirSync("assets");
  res.render("index", { assets });
});

app.get("/watching/:video", function (req, res) {
  const vidName = req.params.video;
  const assets = fs.readdirSync("assets");

  if (!assets.includes(req.params.video)) {
    res.status(404).send("<h1>404! file not found</h1>");
    return;
  }
  res.render("video", { vidName });
});

app.get("/video/:video", function (req, res) {
  const path = "assets/" + req.params.video;
  const assets = fs.readdirSync("assets");
  if (!assets.includes(req.params.video)) {
    res.status(404).send("<h1>404! file not found</h1>");
    return;
  }
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parseInt(parts[1], 10) || fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(path, { start, end }, { autoClose: true });
    const header = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    //206 meaning we are sending a partial content
    res.writeHead(206, header);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.listen(3000, () => console.log("Listening to port " + 3000));
