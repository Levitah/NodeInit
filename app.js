//import User from 'models/User.js'
const http = require('http');
var userDAO = require("./repositories/UserDAO.js");

const config = require('./config/server');
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path');

const fs = require('fs');
const ejs = require('ejs');

const express = require('express')
const app = express();
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

router.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/user/detail", function(req, res) {
  userDAO.getLast().then((user) => {
    var renderData = {};
    renderData.userName = user.name;
    renderData.userEmail = user.email;
    renderData.userPhoto = user.photo;

    res.render("user/detail", renderData);
  }).catch((err) => {
    console.log("error", err);
  });
  //res.sendFile(__dirname + "/views/user/detail.html");
});

router.get("/user/create", function(req, res) {
  res.sendFile(__dirname + "/views/user/create.html");
});

router.post('/user/create', upload.single('photo'), function (req, res, next) {
  newUser = {};
  newUser.name = req.body.name;
  newUser.birthDate = req.body.birthDate;
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  newUser.active = req.body.active;

  newUser.photo = base64_encode(req.file);
  userDAO.create(newUser);
})

function base64_encode(file) {
  return "data:image/" + getFileExtension(file.originalname) + ";base64," + file.buffer.toString('base64');
}

function getFileExtension(fileName) {
  var fileParts = fileName.split(".");
  return fileParts[fileParts.length - 1];
}

app.use('/', router);
app.listen(process.env.port || 3000);