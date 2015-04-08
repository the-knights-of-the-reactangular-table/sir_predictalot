var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  = require("../constants/PredictionConstants");
var PredictionAPIUtils 	 = require("../utils/PredictionAPIUtils");

var ActionTypes = PredictionConstants.ActionTypes;

module.exports = {

	makePrediction: function(info) {

		var prediction = {
			// username would be taken server-side from credentials, not here
			username : info.username,
			type 	 : info.type,
			topic 	 : info.topic,
			pred_id  : info.pred_id,
			chosen   : info.chosen,
			quantity : info.quantity || null
		};

		PredictionAPIUtils.makePrediction(prediction);
	},

	submitCustomPrediction: function(info) {

		var prediction = {
			// username would be taken server-side from credentials, not here
			username : info.username,
			topic 	 : info.topic,
			text 	 : info.text,
			imgURL 	 : info.imgURL
		};

		PredictionAPIUtils.submitCustomPrediction(prediction);
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