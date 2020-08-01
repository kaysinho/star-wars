const express = require('express');
const http = require('http');
const Films = require('./films')
const port = process.env.PORT || 8080;

const app = express();

console.log('::::::.... Node.js server - Listening on port ' + port + ' ...::::::');
console.log(':::....... Visit ' + 'http://localhost:' + port + '/ .................:::');

let server = http.createServer(app);

//Consumo al API de los Planetas
Films.getAll().then((data)=>console.log(data))

server.listen(port);