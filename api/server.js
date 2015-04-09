var Path 	= require('path');
var Db 		= require('./db');
var Hapi 	= require('hapi');
var server 	= new Hapi.Server();

server.connection({
	host:  process.env.HOST	|| 'localhost',
	port: process.env.PORT || 8000
});

server.route([
		{
		path: '/{param*}',
		method: 'GET',
		handler: {
	        directory: {
	            path: Path.resolve(__dirname + '/../public'),
	        	index: true
	        }
		}
	},

		{
		path: '/api/v1/events',
		method: 'GET',
		handler: function(request, reply) {
			reply('Hi m8');
		}
	},

		{
		path: '/api/v1/events',
		method: 'POST',
		handler: function(request, reply) {
			reply('Hi m8');
		}
	},


		{
		path: '/api/v1/events/{name}',
		method: 'GET',
		handler: function(request, reply) {
			reply('Hi m8');
		}
	},


		{
		path: '/api/v1/events/{name}',
		method: 'PUT',
		handler: function(request, reply) {
			reply('Hi m8');
		}
	},


		{
		path: '/api/v1/events/{name}',
		method: 'POST',
		handler: function(request, reply) {
			reply('Hi m8');
		}
	}
]);

module.exports = server;
