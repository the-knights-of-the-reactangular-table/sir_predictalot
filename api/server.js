var Path 	  = require("path");
var DummyData = require("./dummydata.json");
var Hapi 	  = require("hapi");
var server 	  = new Hapi.Server();

server.connection({
	host: "localhost",
	port: process.env.PORT || 8000
});

server.route([
		{
		path: "/{param*}",
		method: "GET",
		handler: {
	        directory: {
	            path: Path.resolve(__dirname + "/../public"),
	        	index: true
	        }
		}
	},

		{
		path: "/api/v1/events",
		method: "GET",
		handler: function(request, reply) {
			reply("Hi m8");
		}
	},

		{
		path: "/api/v1/events",
		method: "POST",
		handler: function(request, reply) {
			reply("Hi m8");
		}
	},


		{
		path: "/api/v1/events/{name}",
		method: "GET",
		handler: function(request, reply) {
			reply("Hi m8");
		}
	},


		{
		path: "/api/v1/events/{name}",
		method: "PUT",
		handler: function(request, reply) {
			reply("Hi m8");
		}
	},

	// Route for posting a new prediction
		{
		path: "/api/v1/events/{name}",
		method: "POST",
		handler: function(request, reply) {
			var rawEvents = DummyData.events;
			var event 	= request.params.name;
			var newPrediction;

			if (!rawEvents.hasOwnProperty(event)) {
				return reply("Invalid submission");
			}

			newPrediction = {
				"type": ["binary"],
				"createdBy": request.payload.username,
				"name": request.payload.text, 
				"imgURL": request.payload.imgURL,
				"option1": [], 
				"option2": [],
				"pointsForCorrect": 10000 
			};

			rawEvents[event].predictions.push(newPrediction);
			console.log(rawEvents[event]);
			reply(rawEvents[event]);
		}
	}

]);

module.exports = server;