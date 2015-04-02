var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants 	= require("../constants/PredictionConstants");
var EventEmitter 			= require("events").EventEmitter;
var assign 		 			= require("object-assign");

var ActionTypes  = PredictionConstants.ActionTypes;
var CHANGE_EVENT = "change";

var _currentEvent = null;
var _events 	  = {};

var EventStore = assign({}, EventEmitter.prototype, {

	init: function(rawEvents) {
		var event;
		for (event in rawEvents) {
			_events[event] = rawEvents[event];
		}

		if(!_currentEvent) {
			_currentEvent = "boxing";
		}
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	get: function(event) {
		return _events[event];
	},

	getCurrentEvent: function() {
		return _events[_currentEvent];
	},

	getAll: function() {
		return _events;
	}

});

EventStore.dispatchToken = PredictionAppDispatcher.register(function(action) {
	var event;

	switch(action.type) {

		case ActionTypes.RECEIVE_RAW_DATA:
			EventStore.init(action.rawData.events);
			EventStore.emitChange();
			break;

		case ActionTypes.RECEIVE_RAW_EVENT:
			EventStore.emitChange();
			break;

		case ActionTypes.RECEIVE_RAW_UPDATED_EVENTS:
			for (event in action.rawEvents) {
				if (_events.hasOwnProperty(event)) {
					_events[event] = rawEvents[event];
				}
			}
			EventStore.emitChange();
			break;

		case ActionTypes.RECEIVE_RAW_NEW_EVENTS:
			for (event in action.rawEvents) {
				if (!_events.hasOwnProperty(event)) {
					_events[event] = rawEvents[event];
				}
			}
			EventStore.emitChange();
			break;

		default:

	}
});

module.exports = EventStore;