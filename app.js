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
    passport = require('passport'),
    jwt = require('jwt-simple'),
    config = require('./app/config'),
    cors = require('cors');

// api url routes
var routeSignUp = require('./app/routes/sign-up-router'),
    routeSignIn = require('./app/routes/sign-in-router'),
    routeSignOut = require('./app/routes/sign-out-router'),
    routeHome = require('./app/routes/home-router');

var app = express();

//region DATABASE SETUP
mongoose.connect(config.dbUrl);

mongoose.connection.on('connected', function () {
    console.log('Connected to DB');
});

mongoose.connection.on('error', function (err) {
    console.log('Error on db connection: ' + err);
});
//endregion

// set secret for json web token
app.set('secret', config.dbSecret);

// set cors usage
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// api url routes usage
app.use('/signin', routeSignIn);
app.use('/signup', routeSignUp);
app.use('/signout', routeSignOut);
app.use('/home', routeHome);

// api auth
app.use(passport.initialize());

// logger
app.use(morgan('dev'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//region ERROR HANDLERS
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        return res.json({
            message: err.message,
            error: err.status
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    return res.json({
        message: err.message,
        error: {}
    });
});
//endregion

module.exports = app;
