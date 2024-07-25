const express = require('express');
const morgan = require('morgan');

const shopRouter = require('./routers');
const {errorHandlers: {yupValidationErrorHandler, sequelizeErrorHandler, errorHandler}} = require('./middleware')


const app = express();


app.use(express.json());
app.use(morgan('dev'));

app.use('/', shopRouter);

app.use(yupValidationErrorHandler, sequelizeErrorHandler, errorHandler);


module.exports = app;
