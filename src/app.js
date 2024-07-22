const express = require('express');
const morgan = require('morgan');

const shopRouter = require('./routers');
const {errorHandlers: {sequelizeErrorHandler, errorHandler}} = require('./middleware')


const app = express();


app.use(express.json());
app.use(morgan('dev'));

app.use('/', shopRouter);

app.get('/error/', (req, res, next) => {
    try {
        throw new Error('Test error');
    } catch (error) {
        next(error)
    }
})
app.use(sequelizeErrorHandler, errorHandler);


module.exports = app;
