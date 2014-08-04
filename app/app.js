/**
  Main app module
  @module app
  @main app
 */

var log = config.getLogger('app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var morganext = require('./config/morgan-ext');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var publicPath = path.join(__dirname, '../public');

var app = express();

log.info('app init');
log.debug('env is \x1b[34m' + config.env.current + '\x1b[39m');

// http logging
morgan.format('custom', morganext.format);
var httpLogger = morgan('custom');
app.use(httpLogger);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// etc
app.use(favicon(path.join(publicPath, 'images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(publicPath));

// routes
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
