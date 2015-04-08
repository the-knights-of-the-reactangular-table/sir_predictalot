var PredictionAppDispatcher = require('../dispatcher/PredictionAppDispatcher');
var PredictionConstants     = require('../constants/PredictionConstants');

var ActionTypes = PredictionConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawData, callback) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_DATA,
      rawData: rawData,
      callback: callback
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
  },

  receiveUpdatedEvent: function(event) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_UPDATED_EVENT,
      rawEvent: event 
    });
  }

};