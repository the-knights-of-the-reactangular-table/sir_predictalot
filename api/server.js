var Path 	= require('path');
var Data 	= require("./dummydata.json");
var Hapi 	= require('hapi');
var server 	= new Hapi.Server();

server.connection({
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
		path: '/login',
		method: ['GET', "POST"],
		handler: function(request, reply) {
			var user = request.payload.user;
			var initialBatch = {
				user: null,
				predictions: []
			};

			if (!Data.users.hasOwnProperty(user)) {
				console.log("error");
				return reply({alert: "error", description: "That user doesn't exist"});
			}

			// Get the users preferences and return them a selection of predictions per topic;
			var userTopics = Data.users[user].preferences.topics;
			// Add logic for in case user has >10 topics in preferences
			var predictionsPerTopic = Math.floor(10 / userTopics.length);
			console.log(predictionsPerTopic);

			// For each topic in the user's preferences
			userTopics.forEach(function(ele) {
				var idOfLastEvent = Data.users[user].stats[ele].last_prediction_id;

				if(!idOfLastEvent) {
					for (var i = 0; i < predictionsPerTopic; i++) {
						initialBatch.predictions.push(Data.topics[ele].predictions[i]);
						console.log(initialBatch);
					}
					return;
				}

				// Look at the corresponding list of predictions available for it
				Data.topics[ele].predictions.forEach(function(prediction, index) {
					var indexOfFirstUnfinishedEvent;

					if(prediction.id === idOfLastEvent) {
						indexOfFirstUnfinishedEvent = index + 1;
					} else if (idOfLastEvent === undefined) {
						indexOfFirstUnfinishedEvent = 0;
					}

					// Add the 5 predictions after the user's most prediction to the batch we send to the user
					if(index - indexOfFirstUnfinishedEvent < predictionsPerTopic) {
						var freshPrediction = {
							id    : prediction.id,
							text  : prediction.text,
							url   : prediction.url,
							topic : prediction.topic
						};

						initialBatch.predictions.push(freshPrediction);
					}
					return;
				});
				return;
			});

			initialBatch.user = Data.users[user];

			return reply(initialBatch);
		}
	},

	{
		path: "/makeprediction",
		method: "GET",
		handler: function(request, reply) {
			var prediction = request.payload;
			var user 	   = prediction.username;
			var topicStats = Data.users[user].stats[prediction.topic];

			if (!Data.topics[prediction.topic]) {
				return reply({alert: "error", description: "That topic doesn't exist!?"});
			}


			// for the topic the user predicted on
			// if the topic is m8s, delete that id from their 'unfinished' m8s array
			// otherwise update the user's last prediction id with the prediction id
			// push the user to the array of users that voted on that option
			if (prediction.topic === "m8s") {
				var indexOfPrediction = topicStats.m8_predictions.indexOf(prediction.id);
				topicStats.m8_predictions.splice(indexOfPrediction, 1);
			} else {
				topicStats.last_prediction_id = prediction.id;
			}

			Data.topics[prediction.topic].predictions.forEach(function(ele, index) {
				if (ele.id === prediction.id) {
					// Check that the user hasn't already voted
					if (ele.option1.indexOf(user) !== -1 &&
						ele.option2.indexOf(user) !== -1) {
						ele[prediction.chosen].push(user);
					} else {
						return reply({alert: "error", description: "You've already voted on that!"});
					}
				}
			});

			return reply();

		}
	},

	{
		path: '/api/v1/users',
		method: 'POST',
		handler: function(request, reply) {
			var topic;
			var topicsList = [];

			if (Data.users.hasOwnProperty(request.payload.username)) {
				return reply({alert: "error", description: "That username is already taken, try another"});
			}

			for (topic in Data.topics) {
				if (Data.topics.hasOwnProperty(topic)) {
					topicsList.push(topic);
				}
			}

			var userObject = {
				username : info.username,
				stats : {},
				preferences : {
					topics: topicsList
				}
			};

			Data.users.push(userObject);


		}
	},

	{
		path: '/api/v1/users/{user}',
		method: 'GET',
		handler: function(request, reply) {
			var user = request.params.user;

			if (!Data.users.hasOwnProperty(user)) {
				return reply({alert: "error", description: "That user doesn't exist"});
			}

			return reply(Data.users[user]);
		}
	},

	{
		path: '/api/v1/users/{user}/preferences/topics/{id}',
		method: 'DELETE',
		handler: function(request, reply) {
			var user = request.params.user;
			var topic = request.params.id;

			if (!Data.users.hasOwnProperty(user)) {
				return reply({alert: "error", description: "That user doesn't exist"});
			} else if (Data.users[user].preferences.topics.indexOf(topic) === -1) {
				return reply({alert: "error", description: "You've already binned that topic"});
			}

			// Find the index of the desired element to be removed
			var topicPrefs = Data.users[user].preferences.topics;
			var topicLocation = topicPrefs.indexOf(topic);
			// Delete that element from the array
			topicPrefs.splice(topicLocation, 1);

			return reply(Data.users[user]);
		}
	},


		{
		path: '/api/v1/topics',
		method: 'GET',
		handler: function(request, reply) {
			reply(Data.topics);
		}
	},

	{
		path: '/api/v1/topics/random/{number?}',
		method: 'GET',
		handler: function(request, reply) {

			var user 			= request.payload.username;
			var topicOptions 	= Data.users[user].preferences.topics;
			var randomEvent 	= topicOptions[Math.floor(Math.random() * topicOptions.length)];
			var idOfLastEvent 	= Data.users[user].stats[randomEvent].last_prediction_id;

			// Finding the index of the oldest non-finished topic;
			var indexOfFirstUnfinishedEvent;
			var batchOfPredictions = [];

			// Iterate over the predictions available in the random topic
			// Better to use array.some so we can break execution.
			Data.topics[randomEvent].predictions.forEach(function(ele, index) {

				if (batchOfPredictions.length < request.params.number || 6) {

					var freshPredictionOfBelAir = {
						id    : ele.id,
						text  : ele.text,
						url   : ele.url,
						topic : ele.topic
					};

					// If the topic is m8s
					if(randomEvent === "m8s") {
						// If the topic's Id is available to the user
						if (Data.users[user].stats.m8s.m8_predictions.indexOf(ele.id) !== -1) {
							return batchOfPredictions.push(ele);
						}
					}

					// If the topic is non-m8s
					// If our user's last prediction ID matches the element's id, store the index of that element
					if(ele.id === idOfLastEvent) {
						indexOfFirstUnfinishedEvent = index + 1;
					} else if (idOfLastEvent === undefined) {
						indexOfFirstUnfinishedEvent = 0;
					}

					return batchOfPredictions.push(freshPredictionOfBelAir);
				}
			});

			reply(batchOfPredictions);
		}
	},

	{
		path: '/api/v1/topics/{name}',
		method: 'GET',
		handler: function(request, reply) {
			reply('Hi m8');
		}
	},


	{
		path: '/api/v1/topics/{name}',
		method: 'POST',
		handler: function(request, reply) {
			reply('Hi m8');
		}
	},

	//Route for posting custom predictions
	{
		path: '/api/v1/topics/{topic}/predictions',
		method: 'POST',
		handler: function(request, reply) {
			var topic = request.params.topic;
			var info  = request.payload;
			var newPrediction;

			if(!Data.topics[topic]) {
				Data.topics[topic] = {
					"predictions": []
				};
			}

			newPrediction = {
				topic: request.payload.topic,
				url: request.payload.url,
				text: request.payload.text,
				createdBy: request.payload.username,
				option1: [],
				option2: [],
				id: Date.now()
			};

			Data.topics[topic].predictions.push(newPrediction);

			// If the prediction is for the friend network only, for each friend in the user's friends list,
			// Add that prediction's id to their array of available m8 predictions.
			if(newPrediction.topic === "m8s") {
				Data.users[request.payload.username].friendsList.forEach(function(m8, ind) {
					m8.stats.m8_predictions.push(newPrediction.id);
				});
			}

			return reply({alert: "success", description: "Your prediction has been saved!"});
		}
	}
]);

module.exports = server;
