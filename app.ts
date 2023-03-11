import { User } from "./models/user";

const http = require('http');
//const User = require('models/User.ts');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World');
  
  const tes: User = new User();
  tes.name = "Teste";
  tes.age = 16;
  
  res.end(tes.isAdult);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});