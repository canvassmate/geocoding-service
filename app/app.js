/**
  app.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  Main app module
  @module app
  @main app
 */
'use strict';

const log = config.logger('app'),
      express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      morgan = require('morgan'),
      morganext = require('./config/morgan-ext'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser');

const routes = require('./routes/index'),
      users = require('./routes/users');

const publicPath = path.join(__dirname, '../public');

const app = express();

log.info('app init');
log.debug('env is \x1b[34m' + config.env.current + '\x1b[39m');

// http logging
morgan.format('custom', morganext.format);
const httpLogger = morgan('custom');
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
	const err = new Error('Not Found');
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
