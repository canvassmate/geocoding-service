# config.coffee,
# Main configuration namespace
# Author: Matias Pequeno
# Date: Aug 3, 2014
# Copyright (c) 2014 Canvassmate. All rights reserved.

# Set the current environment to true in the env object
currentEnv = process.env.NODE_ENV or 'development'
exports.appName = "geocoding-service"
exports.env =
	production: false
	staging: false
	test: false
	development: false
	current: currentEnv
exports.env[currentEnv] = true

# log config
if currentEnv isnt 'production' then process.env['DEBUG'] = '*' # node-debug
exports.log4js = require('log4js')
exports.log4js.configure('./app/config/log4js.json', { reloadSecs: 60, cwd: "./var/log" })
exports.getLogger = exports.log4js.getLogger # helper

# server config
exports.server =
	port: 9600
	# In staging and production, listen loopback. nginx listens on the network.
	ip: '127.0.0.1'
if currentEnv not in ['production', 'staging']
	exports.enableTests = true
	# Listen on all IPs in dev/tests (for testing from other machines)
	exports.server.ip = '0.0.0.0'

# db
exports.db =
	URL: "mongodb://localhost:27017/#{exports.appName}_#{currentEnv}"
