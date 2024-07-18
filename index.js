'use strict';

const app = require('./src/app');

const http = require('http');

require('dotenv').config();

const port = process.env.SERVER_PORT;
const hostName = process.env.HOST_NAME;
const isSecure = Number(process.env.SERVER_IS_SECURE);

const server = http.createServer(app);
server.listen(port, hostName, () => {
    const address = `http${isSecure ? 's' : ''}://${hostName}:${port}`
    console.log(`Server listening to ${address}`);
});
