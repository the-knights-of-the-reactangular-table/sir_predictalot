var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  = require("../constants/PredictionConstants");
var PredictionAPIUtils 	 = require("../utils/PredictionAPIUtils");

var ActionTypes = PredictionConstants.ActionTypes;

module.exports = {

	newPrediction: function(type, topic, pred_lvl, selected) {
		// PredictionAppDispatcher.dispatch({
		// 	type   : PredictionConstants.NEW_PREDICTION,
		// 	option : option
		// });

		var timestamp = Date.now();
		var prediction = {
			id 		 : "p_" + timestamp,
			date 	 : new Date(timestamp),
			username : "MIJOTHY",
			type 	 : type,
			topic 	 : topic,
			pred_lvl : pred_lvl,
			selected : selected
		};

		PredictionAPIUtils.createPrediction(prediction);
	}

};