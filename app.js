//import User from 'models/User.js'
const http = require('http');
var user = require("./models/User.js");
var userDAO = require("./repositories/UserDAO.js");

const app = require('./config/server');
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path');

const express = require('express')
const server = express();
const router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

router.get("/user/create", function(req, res) {
  res.sendFile(__dirname + "/views/user/create.html");
});

server.use('/', router);
server.listen(process.env.port || 3000);