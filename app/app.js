// Logging
//var log = config.getLogger('app');
var morgan = require('morgan'); // http logging

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//log.info('app init');
//log.debug('env is \'' + config.env.current + '\'');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(morgan('dev'));
//app.use(config.log4js.connectLogger(log, { level: 'auto' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error Handlers

// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', { message: err.message, error: err });
	});
}

// Production error handler
// no stacktrace leaked to users
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', { message: err.message, error: {} });
});

module.exports = app;