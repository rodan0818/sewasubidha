var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./services/mongoDB');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const serviceListRouter = require('./routes/serviceList');
const serviceRouter = require('./routes/service');
const locationRouter = require('./routes/location');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  origin: true,
};

var app = express();
connectDB()
  .then((db) => {
    console.log('Succefully connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error while connecting to the MongoDB');
  });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/services-list', serviceListRouter);
app.use('/services', serviceRouter);
app.use('/locations', locationRouter);

module.exports = app;
