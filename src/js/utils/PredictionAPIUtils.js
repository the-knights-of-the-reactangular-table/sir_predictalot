var PredictionServerActionCreators = require("../actions/PredictionServerActionCreators");
var Request = require("superagent");

module.exports = {

  login: function(username) {

	var userObj = {
		user: username
	};

	Request.post("/login")
		.send(userObj)
		.end(function(err, res) {
				PredictionServerActionCreators.receiveRawData(res.body);
		});
  },

  submitForm: function(formData) {

	Request.post("/api/v1/topics/" + formData.topic + "/predictions")
		.send(formData)
		.end(function(err, res) {
				PredictionServerActionCreators.receiveAlert(res.body);
		});
  },

  makePrediction: function(predictionInfo) {

	Request.post("/makeprediction")
		.send(predictionInfo)
		.end(function(err, res) {
				PredictionServerActionCreators.receiveSwipe(res.body, predictionInfo.type);
		});
  },

  deleteTopic: function(deletionInfo) {
	Request.post("/deletetopic")
	 	.send(deletionInfo)
	  	.end(function(err, res) {
				PredictionServerActionCreators.receiveRawData(res.body);
	  });
  }

};