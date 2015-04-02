var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants 	= require("../constants/PredictionConstants");
var UserStore 				= require("../stores/UserStore");
var EventStore 				= require("../stores/EventStore");
var EventEmitter 			= require("events").EventEmitter;
var assign 		 			= require("object-assign");

var ActionTypes  = PredictionConstants.ActionTypes;
var CHANGE_EVENT = "change";

var SubjectStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getSubject: function(type, event, level) {
		var games = EventStore.get(event)[type];

		return games[level];
	},

	getCurrentSubject: function(type) {
		var currentUser  = UserStore.getCurrentUser();
		var currentEvent = currentUser.preferences.currentSelection;
		var currentTopic = currentUser.stats[currentEvent][type];

		var games = EventStore.get(currentEvent)[type];

		return games[currentTopic];
	}

});

SubjectStore.dispatchToken = PredictionAppDispatcher.register(function(action) {
	PredictionAppDispatcher.waitFor([
		UserStore.dispatchToken,
		EventStore.dispatchToken
	]);

	switch (action.type) {

		case ActionTypes.SWITCH_TOPIC:
			SubjectStore.emitChange();
			break;

		case ActionTypes.RECEIVE_UPDATED_USER:
			SubjectStore.emitChange();
			break;
	}

});

module.exports = SubjectStore;