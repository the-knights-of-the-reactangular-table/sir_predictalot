var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  	= require("../constants/PredictionConstants");
var EventEmitter 			= require("events").EventEmitter;
var assign 					= require("object-assign");

var ActionTypes  = PredictionConstants.ActionTypes;
var CHANGE_EVENT = "change";

var _username 	 = null;
var _currentUser = {};

var UserStore = assign({}, EventEmitter.prototype, {

	init: function(rawUser) {
		this.setUser(rawUser);
	},

	setUser: function(rawUser) {
		var user = rawUser.username;
		
		_currentUser[user] = {
			username: user,
			email: rawUser.email,
			points: rawUser.points,
			preferences: rawUser.preferences,
			stats: rawUser.stats 
		};

		if(!_username) {
			_username = user;
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

	get: function(user) {
		return _currentUser[user];
	},

	getPrevious: function() {
		return this.get("_oldUser");
	},

	getCurrentUsername: function() {
		return _username;
	},

	getCurrentUser: function() {
		return _currentUser[_username];
	}

});

UserStore.dispatchToken = PredictionAppDispatcher.register(function(action) {

	switch(action.type) {

		case ActionTypes.RECEIVE_UPDATED_USER:
			_username = action.rawPrediction.username;
			_currentUser._oldUser = _currentUser[_username];
			UserStore.setUser(action.rawUser);
			UserStore.emitChange();
			break;

		case ActionTypes.RECEIVE_RAW_DATA:
			UserStore.init(action.rawData.user);
			UserStore.emitChange();
			break;

		default:
	}
});

module.exports = UserStore;