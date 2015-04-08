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

	// Dumping all the data
		{
		path: "/api/v1",
		method: "GET",
		handler: function(request, reply) {
			reply(DummyData);
		}
	},

		{
		path: "/api/v1/events",
		method: "GET",
		handler: function(request, reply) {
			reply(DummyData.events);
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
			var events      = DummyData.events;
			var singleEvent = request.params.name;

			if (!events.hasOwnProperty(singleEvent)) {
				return reply("That event doesn't exist!");
			}
			reply(DummyData.events[singleEvent]);
		}
	},


		{
		path: "/api/v1/events/{name}",
		method: "PUT",
		handler: function(request, reply) {
			reply("Hi m8");
		}
	},

	{
		path: "/api/v1/events/{name}",
		method: "POST",
		handler: function(request, reply) {
			reply("Hi m8");
		}
	},

	// Route for posting a custom prediction
		{
		path: "/api/v1/events/{name}/predictions",
		method: "POST",
		handler: function(request, reply) {
			var events      = DummyData.events;
			var singleEvent = request.params.name;
			var newPrediction;

			if (!events.hasOwnProperty(singleEvent)) {
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

			events[singleEvent].predictions.push(newPrediction);
			reply(events[singleEvent]);
		}
	},

	// Route for making a prediction
		{
		path: "/api/v1/events/{name}/predictions/{id}",
		method: "POST",
		handler: function(request, reply) {
			var events       = DummyData.events;
			var user 		 = DummyData.user;
			var singleEvent  = request.params.name;
			var predictionId = request.params.id;
			var chosenOption = request.payload.chosen;

			console.log(events[singleEvent].predictions);
			
			var newPrediction = {
				username: request.payload.username,
			};

			if (!events.hasOwnProperty(singleEvent)) {
				return reply("Invalid submission");
			}

			// Push our user to the array of users that have selected that option
			events[singleEvent].predictions[predictionId][chosenOption].push(newPrediction);
			
			// If the user doesn't have the event in their stats, add it
			if (!user.stats[singleEvent]) {
				user.stats[singleEvent] = {
					name: singleEvent,
					points: 0,
					predictions: 0,
					challenges: 0
				};
			}

			// Increment the prediction level that the user is on, and set their current selection to that event
			user.stats[singleEvent].predictions += 1;
			user.preferences.currentSelection = singleEvent;

			return reply(user);
		}
	}

]);

module.exports = server;