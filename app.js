//import User from 'models/User.js'
const http = require('http');
var user = require("./models/User.js");
var userDAO = require("./repositories/UserDAO.js");

const config = require('./config/server');
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path');

const fs = require('fs');

const express = require('express')
const app = express();
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));

router.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
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