const express = require('express');
const morgan = require('morgan');

const shopRouter = require('./routers');


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/', shopRouter);

module.exports = app;
