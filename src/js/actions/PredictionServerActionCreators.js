var PredictionAppDispatcher = require('../dispatcher/PredictionAppDispatcher');
var PredictionConstants     = require('../constants/PredictionConstants');

var ActionTypes = PredictionConstants.ActionTypes;

module.exports = {

  receiveSwipe: function(rawData){
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_SWIPE,
      rawData: rawData
    });
  },

  receiveAll: function(rawData) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_DATA,
      rawData: rawData
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