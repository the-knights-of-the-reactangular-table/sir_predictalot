var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  = require("../constants/PredictionConstants");
var PredictionAPIUtils 	 = require("../utils/PredictionAPIUtils");
var PredictionServerActionCreators = require('./PredictionServerActionCreators');
var ActionTypes = PredictionConstants.ActionTypes;


module.exports = {

	login: function(username) {
		PredictionAPIUtils.login(username);
	},

	navigateTo: function(info){

		var route = info;
		PredictionAppDispatcher.dispatch({
			type: ActionTypes.NAVIGATE_TO,
			route: route
		});
	},

	newSwipe: function(info){

		var prediction = {
			username : info.username,
			id 		 : info.id,
			topic 	 : info.topic,
			chosen   : info.option,
			type 	 : info.type,
		};

		PredictionAPIUtils.makePrediction(prediction);

	},

	getFormInput: function(info) {

		var prediction = {
			username : info.username,
			text     : info.inputText,
			url      : info.inputURL,
			topic 	 : info.inputCategory
		};

		PredictionAPIUtils.submitForm(prediction);
	}

};
