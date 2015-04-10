var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  	= require("../constants/PredictionConstants");
var EventEmitter 			= require("events").EventEmitter;
var assign 					= require("object-assign");

var ActionTypes  = PredictionConstants.ActionTypes;
var CHANGE_EVENT = "change";

var _user 		 = null;
var _route 		 = "login";
var _active 	 = null;
var _alert 		 = null;

var _predictions = [];

var AppStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		console.log(_predictions);
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getUser: function() {
		return _user;
	},

	getPrediction: function(){
		return _predictions[0];
	},

	getPredictions: function() {
		return _predictions;
	},

	getActive: function() {
		return _active;
	},

	getRoute: function() {
		return _route;
	},

	getCurrentAlert: function() {
		return _alert;
	}

});

PredictionAppDispatcher.register(function(action) {

	switch(action.type) {


		case ActionTypes.RECEIVE_RAW_DATA:
			_user = action.rawData.user;
			_predictions = action.rawData.predictions;
			_route = "prediction";
			AppStore.emitChange();
			break;

		case ActionTypes.RECEIVE_SWIPE:
	        if (action.direction ==='swipe-left'){
	        	_predictions[_predictions.length-1].left=true;

	        } else if (action.direction ==='swipe-right'){
	        	_predictions[_predictions.length-1].right=true;

	        }
	        _predictions.shift();
	        if(action.newPrediction) {
				_predictions.push(action.newPrediction);
	        }
	        AppStore.emitChange();

	        break;


	    case ActionTypes.NAVIGATE_TO:
	    	_route = action.route;
	    	AppStore.emitChange();
	    	break;

	    case ActionTypes.RECEIVE_ALERT:
	    	_route = "prediction";
	    	_alert = action.alert;
	    	AppStore.emitChange();
	    	break;

	    case ActionTypes.CLOSE_ALERT:
	    	_alert = null;
	    	AppStore.emitChange();
	    	break;

		default:

	}
});

module.exports = AppStore;
