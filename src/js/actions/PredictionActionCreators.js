var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  = require("../constants/PredictionConstants");
var PredictionAPIUtils 	 = require("../utils/PredictionAPIUtils");

var ActionTypes = PredictionConstants.ActionTypes;

module.exports = {

	newPrediction: function(info) {
		// PredictionAppDispatcher.dispatch({
		// 	type   : PredictionConstants.NEW_PREDICTION,
		// 	option : option
		// });

		var timestamp = Date.now();
		var prediction = {
			id 		 : "p_" + timestamp,
			date 	 : new Date(timestamp),
			username : "MIJOTHY",
			type 	 : info.type,
			topic 	 : info.topic,
			pred_lvl : info.pred_lvl,
			chosen   : info.chosen
		};

		PredictionAPIUtils.createPrediction(prediction);
	},

	switchEvent: function(value) {
		PredictionAppDispatcher.dispatch({
			type: PredictionConstants.SWITCH_CURRENT_EVENT,
			direction: value
		});
	}

};