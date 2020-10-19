const express = require("express");
const user = require("../../models/usermodel");

const userController = express();

userController.get("/", (req, res) => {
  res.render("user/login");
});

userController.get("/", (req, res) => {
  res.render("user/signup");
});

module.exports = userController;
