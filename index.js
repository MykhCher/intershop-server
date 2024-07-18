'use strict';

const app = require('./src/app');

const http = require('http');

const server = http.createServer(app);
server.listen('5000', '127.0.0.1', () => {console.log('Listening')})
