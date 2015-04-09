var Path 	= require('path');
var Data 	= require("./dummydata.json");
var Hapi 	= require('hapi');
var server 	= new Hapi.Server();

server.connection({
	host: 'localhost',
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
		path: '/api/v1/users',
		method: 'POST',
		handler: function(request, reply) {
			var event;
			var eventsList = [];

			if (Data.users.hasOwnProperty(request.payload.username)) {
				return reply({error: true, description: "That username is already taken, try another"});
			}

			for (event in Data.events) {
				eventsList.push(event);
			}

			var User = function(info) {
				this.username = info.username;
				this.stats = {};
				this.preferences = {
					events: eventsList
				};
				return this;
			};

			Data.users.push(new User(request.payload));


		}
	},

		{
		path: '/api/v1/users/{user}',
		method: 'GET',
		handler: function(request, reply) {
			var user = request.params.user;

			if (!Data.users.hasOwnProperty(user)) {
				return reply("That user doesn't exist");
			}

			return reply(Data.users[user]);
		}
	},


		{
		path: '/api/v1/events',
		method: 'GET',
		handler: function(request, reply) {
			reply(Data.events);
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
	},

	//Route for posting predictions
	{
		path: '/api/v1/events/{topic}/predictions',
		method: 'POST',
		handler: function(request, reply) {
			var topic = request.params.topic;

			Data.events[topic].predictions.push(request.payload);
		}
	}
]);

module.exports = server;