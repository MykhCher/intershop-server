'use strict';

const app = require('./src/app');

const http = require('http');
const db = require('./src/db/models');


require('dotenv').config();


const port = process.env.SERVER_PORT;
const hostName = process.env.HOST_NAME;
const isSecure = Number(process.env.SERVER_IS_SECURE);


const server = http.createServer(app);

const dbCheck = () => {
    db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection was successfully established!')
    })
    .catch(err => {
        console.log(`Database connection error: ${err.message}`)
    });
}

server.listen(port, hostName, () => {
    const address = `http${isSecure ? 's' : ''}://${hostName}:${port}`;

    console.log(`Server listening to ${address}`);

});

dbCheck();
