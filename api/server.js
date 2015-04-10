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
		method: ["POST"],
		handler: function(request, reply) {
			var user = request.payload.user;
			var initialBatch = {
				user: null,
				predictions: []
			};

			if (!Data.users.hasOwnProperty(user)) {
				return reply({alert: "error", description: "That user doesn't exist"});
			}

			// Get the users preferences and return them a selection of predictions per topic;
			var userTopics = Data.users[user].preferences.topics;
			// Add logic for in case user has >10 topics in preferences
			var predictionsPerTopic = 1;

			// For each topic in the user's preferences
			userTopics.forEach(function(ele) {
				var idOfLastEvent = Data.users[user].stats[ele].last_prediction_id || Data.topics[ele].predictions[0].id;
				var indexOfFirstUnfinishedEvent;

				// Look at the corresponding list of predictions available for it
				Data.topics[ele].predictions.forEach(function(prediction, index) {

					if(prediction.id === idOfLastEvent) {
						indexOfFirstUnfinishedEvent = index + 1;
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

			// For each prediction id in the user's available social predictions
			Data.users[user].stats.m8s.m8_predictions.forEach(function(predictionId, index) {
				// Add 5 predictions
				Data.topics.m8s.predictions.some(function(prediction) {
					if (predictionId === prediction.id) {
						initialBatch.predictions.push(prediction);
					}
					return index === 5;
				});
			});

			initialBatch.user = Data.users[user];

			return reply(initialBatch);
		}
	},

	{
		path: "/makeprediction",
		method: "POST",
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

			Data.topics[prediction.topic].predictions.some(function(ele, index) {
				if (ele.id === prediction.id) {
					// Check that the user hasn't already voted
					if (ele.option1.indexOf(user) === -1 &&
						ele.option2.indexOf(user) === -1) {
						ele[prediction.chosen].push(user);
						return true;
					}
				}
			});

			var options = {
				url: '/api/v1/topics/random/1',
				method: 'POST',
				payload: {
					username: user
				}
			};
			server.inject(options, function(response){
				reply(response.result[0]);
			});

		}
	},

	{
		path: "/deletetopic",
		method: "POST",
		handler: function(request, reply) {
			var user = request.payload.username;
			var topic = request.payload.topic;

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

			var options = {
				url: "/login",
				method: "POST",
				payload: {
					user: user
				}
			};

			server.inject(options, function(response) {
				return reply(response.result);
			});
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
		method: 'POST',
		handler: function(request, reply) {

			var user 					= request.payload.username;
			var numberRequested 		= request.params.number || 6;

			var stats 					= Data.users[user].stats;
			var prefs 					= Data.users[user].preferences;

			var topicOptions 			= stats.m8s.m8_predictions.length ?
											Data.users[user].preferences.topics.concat("m8s") :
											Data.users[user].preferences.topics;

			// aii sick array randomizer but we gots to check if the topic got any preds for you
			var randomEvent = topicOptions.filter(function(ele) {
				return Data.topics[ele].predictions.length;
			}).sort(function(a, b) {
				return Math.floor(Math.random() > Math.random()) * 2 - 1;
			})[0];

			var mostRecentPredictionId 	= stats[randomEvent].last_prediction_id;

			var indexOfFirstUnfinishedEvent;
			var batchOfPredictions = [];

			// Iterate over the predictions available in the random topic
			Data.topics[randomEvent].predictions.some(function(prediction, index) {

				var freshPredictionOfBelAir = {
					id    : prediction.id,
					text  : prediction.text,
					url   : prediction.url,
					topic : prediction.topic
				};
				// If the random event is m8s and the individual topic is available to the user, add it to the batch we send off
				if(randomEvent === "m8s" && stats.m8s.m8_predictions.indexOf(prediction.id) !== -1) {
					batchOfPredictions.push(freshPredictionOfBelAir);
				} else {

					if(prediction.id === mostRecentPredictionId ) {
						indexOfFirstUnfinishedEvent = index + 1;
					} else if (mostRecentPredictionId === undefined) {
						indexOfFirstUnfinishedEvent = 0;
					}
					if (indexOfFirstUnfinishedEvent === index) {
						batchOfPredictions.push(freshPredictionOfBelAir);
					}

				}
				return batchOfPredictions.length == numberRequested;
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
				Data.users[request.payload.username].friendList.forEach(function(m8, ind) {
					Data.users[m8].stats.m8s.m8_predictions.push(newPrediction.id);
				});
				Data.users[request.payload.username].stats.m8s.m8_predictions.push(newPrediction.id);
			}

			return reply({alert: "success", description: "Your prediction has been saved!"});
		}
	}
]);

module.exports = server;
