var PredictionServerActionCreators = require("../actions/PredictionServerActionCreators");
var Request = require("superagent");
// Localstorage used as a temporary measure to simulate API interaction with ajax or the like
module.exports = {

  getAllData: function() {
    // simulate retrieving data from a database
    var rawData = JSON.parse(localStorage.getItem("data"));

    // simulate success callback
    PredictionServerActionCreators.receiveAll(rawData);
  },

  makePrediction: function(prediction) {
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

    var predictionInfo = { 
        "username": prediction.username,
        "quantity": prediction.quantity  || null
    };

    // Move the user on to the next prediction level
    rawData.user.stats[prediction.topic][prediction.type] += 1;
    // Set the current topic as the user's current selection
    rawData.user.preferences.currentSelection = prediction.topic;
    // Add the user to the array of users in the prediction who have selected one option
    rawData.events[prediction.topic][prediction.type][prediction.pred_id][prediction.chosen].push(predictionInfo);
    localStorage.setItem("data", JSON.stringify(rawData));

    //success callback
    PredictionServerActionCreators.receiveUpdatedUser(rawData.user);
  },

  submitCustomPrediction: function(prediction) {
    Request.post("api/v1/events/" + prediction.topic)
      .send(prediction)
      .end(function(err, res) {
        if (err) {
          console.log("Need to set up error action creator, ", err);
          return err;
        }
        console.log(res.body);
        return PredictionServerActionCreators.receiveUpdatedEvent(res.body);
      });
  }

};