/**
 * Created by dines on 2017-03-20.
 */
'use strict';

var Hapi = require('hapi');
var _ = require('lodash');
var pkg = require('../package.json');

// create the Hapi Server
var PORT = process.env.PORT || 3000;
var server = new Hapi.Server();
server.connection({port: PORT});

// useful Hapi plugins
// to generate API documentation, use the hapi-swagger plugin
var plugins = [
  require('inert'),
  require('vision'),
];

server.register(plugins, function (err) {
  if (err) {
    throw err;
  }

  console.log('=> Registered plugins:', {
    plugins: _.keysIn(server.registrations).join(', ')
  });

  // serve up all static content in client folder
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: '../client',
        listing: false,
        index: true
      }
    }
  });

  // serve up some sample JSON data
  server.route({
    method: 'GET',
    path: '/data',
    handler: (request, reply) => {
      reply({
        name: pkg.name,
        version: pkg.version,
        message: 'Hi, hapi-react-ing!'
      });
    }
  });

  server.start(err => {
    if (err) {
      throw err;
    }
    console.log(`=> Server running at: ${server.info.uri}`);
  });
});

// for server inject in Lab tests
module.exports = server;