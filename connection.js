const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost/video", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(console.log("Database connected "));
};

module.exports = connect;
