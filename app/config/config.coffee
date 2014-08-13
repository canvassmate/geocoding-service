# config.coffee,
# Main configuration namespace
# Author: Matias Pequeno
# Date: Aug 3, 2014
# Copyright (c) 2014 Canvassmate, Ltd. All rights reserved.

# Set the current environment to true in the env object
currentEnv = process.env.NODE_ENV or 'development'
exports.appName = 'geocoding-service'
exports.env =
  production: false
  staging: false
  test: false
  development: false
  current: currentEnv
exports.env[currentEnv] = true

# log config
#if currentEnv isnt 'production' then process.env['DEBUG'] = '*' # node-debug
exports.logger = require('utils/logger.js')

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

# google api keys
exports.keys =
  google: 'AIzaSyBJeTdBWvg_im1XaZyw6PHj6PwhgjA3Mo8'
