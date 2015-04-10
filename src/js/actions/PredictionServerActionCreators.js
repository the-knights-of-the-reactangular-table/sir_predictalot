var PredictionAppDispatcher = require('../dispatcher/PredictionAppDispatcher');
var PredictionConstants     = require('../constants/PredictionConstants');

var ActionTypes = PredictionConstants.ActionTypes;

module.exports = {

  receiveRoute: function (rawData){
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_NAVIGATION,
      rawData: rawData
    });
  },

  receiveAlert: function(alert) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_ALERT,
      alert: alert
    });
  },

  receiveSwipe: function(newPrediction, direction){
    console.log(newPrediction);
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_SWIPE,
      newPrediction: newPrediction,
      direction: direction
    });
  },

  receiveRawData: function(rawData) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_DATA,
      rawData: rawData,
    });
  },

  receiveCreatedPrediction: function(createdPrediction) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_CREATED_PREDICTION,
      rawPrediction: createdPrediction
    });
  },

  receiveUpdatedUser: function(user) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_UPDATED_USER,
      rawUser: user
    });
  }

};
