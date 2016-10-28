// default requirements
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

// project requirements
var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('./config');

// api url routes
var routeStudent = require('./routes/students');
var routeLabs = require('./routes/labs');

var app = express();

// database setup
mongoose.connect(config.dbUrl);
mongoose.connection.on('connected', function () {
    console.log('Connected to DB');
});
mongoose.connection.on('error', function (err) {
    console.log('Error on db connection: ' + err);
});

// set secret for json web token
app.set('secret', config.dbSecret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// api url routes usage
app.use('/students', routeStudent);
app.use('/labs', routeLabs);

// logger
app.use(morgan('dev'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
