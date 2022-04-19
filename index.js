const express = require('express');
const app = require('express')();
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const server = require('http').createServer(app);
require('dotenv').config();
const helmet = require("helmet");
const logger = require('./app/utils/logger');

const route = require('./app/routes/route');

app.use(cors());
app.options('*', cors());
app.use(helmet());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true, limit: '20mb'}));
app.use(express.json({limit:50000000, type:'application/json'}))
app.use(morgan('dev'));
app.use(compression());

//static files
app.use(process.env.STATIC, express.static(path.join(__dirname, '/public')));

//routes
app.use(process.env.ROUTE, route);

app.use((req, res, next)=>{
    const error = new Error('Invalid API endpoint');
    error.status = 404;
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(error);
});

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
});

//launch
app.get('*', (req, res) => {
    res.sendFile('./index.html');
});


server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}...`);
});
