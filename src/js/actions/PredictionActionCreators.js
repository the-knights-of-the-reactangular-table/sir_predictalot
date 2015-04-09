var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  = require("../constants/PredictionConstants");
var PredictionAPIUtils 	 = require("../utils/PredictionAPIUtils");
var PredictionServerActionCreators = require('./PredictionServerActionCreators');
var ActionTypes = PredictionConstants.ActionTypes;


module.exports = {

	navigateTo: function(info){

		var route = {
			username    : "MIJOTHY",
			submission  : info.submission,
			prediction  : info.prediction
		};

		PredictionServerActionCreators.receiveRoute(route);
	},

	newSwipe: function(info){

		var choice = {
			username 	 : "MIJOTHY",
			image    	 : info.image,
			direction 	 : info.direction,
			topic 	 	 : info.topic
		};

	console.log('choice: ', choice);
	PredictionServerActionCreators.receiveSwipe(choice);

	},

	getFormInput: function(info) {

		var data = {
			username  	  : "MIJOTHY",
			inputText 	  : info.inputText,
			inputURL  	  : info.inputURL,
			inputCategory : info.inputCategory
		};

	PredictionServerActionCreators.receiveFormData(data);

	},



	newPrediction: function(info) {
		var prediction = {
			username : "MIJOTHY",
			type 	 : info.type,
			topic 	 : info.topic,
			pred_id  : info.pred_id,
			chosen   : info.chosen
		};

		PredictionAPIUtils.createPrediction(prediction);
	},

	nextRandomEvent: function() {
		PredictionAppDispatcher.dispatch({
			type: ActionTypes.NEXT_RANDOM_EVENT
		});
	},

	previousEvent: function() {
		PredictionAppDispatcher.dispatch({
			type: ActionTypes.PREVIOUS_EVENT
		});
	}

};
