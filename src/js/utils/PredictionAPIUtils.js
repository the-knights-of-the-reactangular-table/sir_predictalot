var PredictionServerActionCreators = require("../actions/PredictionServerActionCreators");
var Request = require("superagent");

module.exports = {

	getAllData: function(callback) {

		Request.get("/api/v1")
			.end(function(err, res) {
				PredictionServerActionCreators.receiveAll(res.body, callback);
			});
			
	},

	makePrediction: function(prediction) {

		Request.post("api/v1/events/" + prediction.topic + "/predictions/" + prediction.pred_id)
			.send(prediction)
			.end(function(err, res) {
				if (err) {
					console.log("Need to set up error action creator, ", err);
					return err;
				}
				return PredictionServerActionCreators.receiveUpdatedUser(res.body);
			});

	},

	submitCustomPrediction: function(prediction) {

		Request.post("api/v1/events/" + prediction.topic + "/predictions")
			.send(prediction)
			.end(function(err, res) {
				if (err) {
					console.log("Need to set up error action creator, ", err);
					return err;
				}
				return PredictionServerActionCreators.receiveUpdatedEvent(res.body);
			});

	}

};