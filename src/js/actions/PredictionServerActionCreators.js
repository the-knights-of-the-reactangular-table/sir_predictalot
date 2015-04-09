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

  receiveFormData: function(rawData) {
    PredictionAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_FORM_DATA,
      rawData: rawData
    });
  },

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
