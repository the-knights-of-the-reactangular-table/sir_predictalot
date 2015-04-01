var PredictionServerActionCreators = require('../actions/PredictionServerActionCreators');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getAllData: function() {
    // simulate retrieving data from a database
    var rawData = JSON.parse(localStorage.getItem('data'));

    // simulate success callback
    PredictionServerActionCreators.receiveAllData(rawData);
  },

  createPrediction: function(prediction) {
    // simulate writing to a database
    var rawData = JSON.parse(localStorage.getItem('data'));

    var timestamp = Date.now();
    var id = 'p_' + timestamp;

    var createdPrediction = {
      id: id,
      timestamp: timestamp,
      username : prediction.username,
      type     : prediction.type,
      topic    : prediction.topic,
      pred_lvl : prediction.pred_lvl,
      chosen   : prediction.chosen
    };

    var predOrChallenge;
    var userPredLvlToIncrement;

    switch(prediction.type) {
    
      case "challenge":
        predOrChallenge = "challengeSubjects";
        userPredLvlToIncrement = "challenge"; 
        break;

      case "prediction":
        predOrChallenge = "predictionSubjects";
        userPredLvlToIncrement = "prediction"; 
        break;

    }

    rawData.user.stats[prediction.topic][userPredLvlToIncrement] += 1;
    rawData.events[prediction.topic][predOrChallenge][prediction.pred_lvl][prediction.chosen].push(prediction.username);

    localStorage.setItem('data', JSON.stringify(rawData));

    // simulate success callback
    setTimeout(function() {
      PredictionServerActionCreators.receiveUpdatedUser(rawData.user);
    }, 0);
  }

};