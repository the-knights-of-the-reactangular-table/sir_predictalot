var Data 	= require("./dummydata.json");
var Path 	= require('path');
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
		method: "POST",
		handler: function(request, reply) {
			var user = request.payload.user;
			var initialBatch = {
				user: null,
				predictions: []
			};

			if (!Data.users.hasOwnProperty(user)) {
				return reply({alert: "error", description: "That user doesn't exist"}).code(404);
			}

			// Get the users preferences and return them a selection of predictions per topic;
			var userTopics = Data.users[user].preferences.topics;
			// Add logic for in case user has >10 topics in preferences
			var predictionsPerTopic = 1;

			// For each topic in the user's preferences
			userTopics.forEach(function(ele) {
				var idOfLastPrediction = Data.users[user].stats[ele].id_of_last_predicted;
				var indexOfFirstUnfinishedPrediction;

				// Look at the corresponding list of predictions available for it
				Data.topics[ele].predictions.some(function(prediction, index) {
					if(prediction.id === idOfLastPrediction) {
						indexOfFirstUnfinishedPrediction = index + 1;
					} else if (!idOfLastPrediction) {
						indexOfFirstUnfinishedPrediction = 0;
					}
					// *** Problem - one prediction from a topic ends up being sent over despite it already being predicted.
					if(indexOfFirstUnfinishedPrediction !== undefined && index >= indexOfFirstUnfinishedPrediction) {
						var freshPrediction = {
							id    : prediction.id,
							text  : prediction.text,
							url   : prediction.url,
							topic : prediction.topic
						};

						// Push the current prediction to the batch we send off to the user, and record that we sent it
						initialBatch.predictions.push(freshPrediction);
						Data.users[user].stats[ele].id_of_last_dispatched = prediction.id;
					}

					// Cease iteration once we have pushed a certain number of predictions from this topic to the batch
					return index - indexOfFirstUnfinishedPrediction >= predictionsPerTopic;
				});
				return;
			});

			// For each prediction id in the user's available social predictions
			Data.users[user].stats.m8s.m8_predictions.forEach(function(predictionId, index) {
				// Add 3 predictions to the batch we send off to the user
				Data.topics.m8s.predictions.some(function(prediction) {
					if (predictionId === prediction.id) {
						initialBatch.predictions.push(prediction);
						Data.users[user].stats.m8s.id_of_last_dispatched = prediction.id;
					}
					return index === 3;
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
				topicStats.id_of_last_predicted = prediction.id;
			}

			Data.topics[prediction.topic].predictions.some(function(ele, index) {
				if (ele.id === prediction.id) {
					// Check that the user hasn't already voted
					if (ele.option1.indexOf(user) === -1 &&
						ele.option2.indexOf(user) === -1) {
						ele[prediction.chosen].push(user);
						return;
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

			// aii sick array randomizer but we gots to check if the topic got any preds for you first
			var randomEvent = topicOptions.filter(function(ele) {
				return Data.topics[ele].predictions.length;
			}).sort(function(a, b) {
				return Math.floor(Math.random() > Math.random()) * 2 - 1;
			})[0];

			var mostRecentPredictionId 	= stats[randomEvent].id_of_last_predicted;
			var mostRecentDispatchedId  = stats[randomEvent].id_of_last_dispatched;

			var indexOfFirstNonDispatchedPrediction;
			var batchOfPredictions = [];

			// Iterate over the predictions available in the random topic
			Data.topics[randomEvent].predictions.some(function(prediction, index) {

				var freshPredictionOfBelAir = {
					id    : prediction.id,
					text  : prediction.text,
					url   : prediction.url,
					topic : prediction.topic
				};
				// If the random event is m8s we check if the individual topic is available to the user. For all other events, no need
				if((randomEvent === "m8s" && stats.m8s.m8_predictions.indexOf(prediction.id) !== -1) || randomEvent !== "m8s") {

					if(prediction.id === mostRecentDispatchedId ) {
						indexOfFirstNonDispatchedPrediction = index + 1;
					} else if (mostRecentDispatchedId === undefined) {
						indexOfFirstNonDispatchedPrediction = 0;
					}

					if (indexOfFirstNonDispatchedPrediction === index) {
						batchOfPredictions.push(freshPredictionOfBelAir);
						Data.users[user].stats[randomEvent].id_of_last_dispatched = prediction.id;
					}
				}
				return batchOfPredictions.length === +numberRequested;
			});
			reply(batchOfPredictions);
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
