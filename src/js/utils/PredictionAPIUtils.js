var PredictionServerActionCreators = require("../actions/PredictionServerActionCreators");
var SuperAgent = require("superagent");
// Localstorage used as a temporary measure to simulate API interaction with ajax or the like
module.exports = {

  getAllData: function() {
    // simulate retrieving data from a database
    var rawData = JSON.parse(localStorage.getItem("data"));

    // simulate success callback
    PredictionServerActionCreators.receiveAll(rawData);
  },

  createPrediction: function(prediction) {
    // simulate writing to a database
    var rawData = JSON.parse(localStorage.getItem("data"));

    if (!rawData.user.stats[prediction.topic]) {
      rawData.user.stats[prediction.topic] = {
          name: prediction.topic,
          points: 0,
          predictions: 0,
          challenges: 0
        };
    }

    rawData.user.stats[prediction.topic][prediction.type] += 1;
    rawData.events[prediction.topic][prediction.type][prediction.pred_id][prediction.chosen].push(prediction.username);
    localStorage.setItem("data", JSON.stringify(rawData));

    //success callback
    PredictionServerActionCreators.receiveUpdatedUser(rawData.user);
  }

};