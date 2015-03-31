module.exports = {
	getPredictionData: function(prediction, currentPrediction){
		var timestamp = Date.now();
		return {
			id: "p_" + timestamp,
		};
	}
};