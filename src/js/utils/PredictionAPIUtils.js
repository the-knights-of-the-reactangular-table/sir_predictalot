var PredictionServerActionCreators = require("../actions/PredictionServerActionCreators");

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

    var timestamp = Date.now();
    var id = "p_" + timestamp;

    var createdPrediction = {
      id: id,
      timestamp: timestamp,
      username : prediction.username,
      type     : prediction.type,
      topic    : prediction.topic,
      pred_lvl : prediction.pred_lvl,
      chosen   : prediction.chosen
    };

    rawData.user.stats[prediction.topic][prediction.type] += 1;
    rawData.events[prediction.topic][prediction.type][prediction.pred_lvl][prediction.chosen].push(prediction.username);
    localStorage.setItem("data", JSON.stringify(rawData));

    // simulate success callback
    setTimeout(function() {
      PredictionServerActionCreators.receiveUpdatedUser(rawData.user);
    }, 0);
  }

};