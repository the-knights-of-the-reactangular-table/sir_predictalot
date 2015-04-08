var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  	= require("../constants/PredictionConstants");
var EventEmitter 			= require("events").EventEmitter;
var assign 					= require("object-assign");

var ActionTypes  = PredictionConstants.ActionTypes;
var CHANGE_EVENT = "change";

var _username 	   = null;
var _user  		   = {};

var _currentEvent  = null;
var _previousEvent = null;
var _events 	   = {};
var _eventsList    = [];

function _setUser(rawUser) {
	var user = rawUser.username;

	_user = rawUser;

	if (!_username) {
		_username = user;
	}
}

function _setEvents(rawEvents) {
	var event;
	_eventsList = [];
	for (event in rawEvents) {
		if (rawEvents.hasOwnProperty(event)) {
			_events[event] = rawEvents[event];
			_eventsList.push(event);
		}
	}
}

var AppStore = assign({}, EventEmitter.prototype, {

	init: function(rawData) {
		_setUser(rawData.user);
		_setEvents(rawData.events);
		_currentEvent = _previousEvent = _user.preferences.currentSelection;
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

	getUser: function() {
		return _user;
	},

	getEvent: function(event) {
		return _events[event];
	},

	getCurrentEvent: function() {
		return this.getEvent(_currentEvent);
	},

	getAllEvents: function() {
		return _events;
	},

	getEventsList: function() {
		return _eventsList;
	},

	getCurrentSubject: function(type) {
		return _events[_currentEvent][type][_user.stats[_currentEvent][type]];
	}

});

AppStore.dispatchToken = PredictionAppDispatcher.register(function(action) {

	switch(action.type) {

		case ActionTypes.RECEIVE_RAW_DATA:
			AppStore.init(action.rawData);
			AppStore.emitChange();
			break;

		case ActionTypes.RECEIVE_UPDATED_USER:
			_setUser(action.rawUser);
			AppStore.emitChange();
			break;

		case ActionTypes.RECEIVE_UPDATED_EVENT:
			_events[event] = action.rawEvent;
			console.log(_events[event]);
			AppStore.emitChange();
			break;

		case ActionTypes.NEXT_RANDOM_EVENT:
			var prefs = _user.preferences;
			var randomEventIndex = Math.floor(Math.random() * prefs.events.length);
			var newEvent;

			_previousEvent = prefs.currentSelection;

			if (prefs.events[randomEventIndex] === _currentEvent) {
				newEvent = prefs.events[randomEventIndex + 1] || prefs.events[randomEventIndex-1];
			} else {
				newEvent = prefs.events[randomEventIndex];
			}

			prefs.currentSelection = newEvent;
			_currentEvent = prefs.currentSelection;
			console.log(_currentEvent);

			if (!_user.stats[_currentEvent]) {
				_user.stats[_currentEvent] = {
					name: _currentEvent,
					points: 0,
					predictions: 0,
					challenges: 0
				};
			}

			AppStore.emitChange();
			break;

		case ActionTypes.PREVIOUS_EVENT:
			_user.preferences.currentSelection = _previousEvent;
			_currentEvent = _previousEvent;
			AppStore.emitChange();
			break;

		default:

	}
});

module.exports = AppStore;