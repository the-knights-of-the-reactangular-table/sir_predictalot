var PredictionAppDispatcher = require("../dispatcher/PredictionAppDispatcher");
var PredictionConstants  	= require("../constants/PredictionConstants");
var EventEmitter 			= require("events").EventEmitter;
var assign 					= require("object-assign");

var ActionTypes  = PredictionConstants.ActionTypes;
var CHANGE_EVENT = "change";

var DATA = [
    {topic: "celebrity", 	url: '/bieber_square.jpg', 		  text: 'Will they get back together in 2015?', 			 animation_class: "", left: false, right: false, id: 1234567890},
    {topic: "celebrity", 	url: '/one_direction_square.png', text: 'Will they break up this year?', 					 animation_class: "", left: false, right: false, id: 1234567891},
    {topic: "politics", 	url: '/david-cameron_square.jpg', text: "Will he be PM after the election?", 				 animation_class: "", left: false, right: false, id: 1234567892},
    {topic: "politics", 	url: '/kim-jong-un_square.jpg',   text: 'Will Kim die this year?', 							 animation_class: "", left: false, right: false, id: 1234567893},
    {topic: "politics", 	url: '/is_square.jpg', 			  text: "Will IS lose the city of Mosul this summer?", 		 animation_class: "", left: false, right: false, id: 1234567894},
    {topic: "politics", 	url: '/saudi_square.png', 		  text: 'Will Saudi Arabia invade Yemen this month?', 		 animation_class: "", left: false, right: false, id: 1234567895},
    {topic: "football", 	url: '/ronaldo_square.jpg', 	  text: "Will Real Madrid win the Champions League 2015?", 	 animation_class: "", left: false, right: false, id: 1234567896},
    {topic: "football", 	url: '/sterling_square.jpg', 	  text: 'Will Raheem Sterling leave Liverpool this summer?', animation_class: "", left: false, right: false, id: 1234567897},
    {topic: "football", 	url: '/manu_square.jpg', 		  text: "Will Man Utd finish second in the Premier League?", animation_class: "", left: false, right: false, id: 1234567898},
    {topic: "boxing", 		url: '/boxing_square.jpg', 		  text: 'Will Mayweather beat Pacquiao?', 					 animation_class: "", left: false, right: false, id: 1234567899}
];

var active = DATA.length - 1;

var _username 	   = null;
var _currentEvent  = null;
var _previousEvent = null;
var _user  		   = {};
var _events 	   = {};

function _setUser(rawUser) {
	var user = rawUser.username;

	_user = rawUser;

	if (!_username) {
		_username = user;
	}
}

function _setEvents(rawEvents) {
	var event;
	for (event in rawEvents) {
		if (rawEvents.hasOwnProperty(event)) {
			_events[event] = rawEvents[event];
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

	getData: function(){
		return DATA;
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

	getCurrentSubject: function(type) {
		return _events[_currentEvent][type][_user.stats[_currentEvent][type]];
	}

});

AppStore.dispatchToken = PredictionAppDispatcher.register(function(action) {
	console.log(action);
	switch(action.type) {

		case ActionTypes.RECEIVE_SWIPE:
			rawData = action.rawData;
			var image_number = DATA.indexOf(rawData.image);
			DATA[image_number].animation_class = rawData.type;
	        active = image_number - 1;



/*	        var newStateObj = {};
	        newStateObj.data = newData;
	        newStateObj.active = new_active;

	        if (didSwipe){
	            newStateObj.swipe = {};
	            newStateObj.swipe.left = "";
	            newStateObj.swipe.right = "";
	        }

	        this.setState(newStateObj);
*/

	        AppStore.emitChange();
	        break;


		case ActionTypes.RECEIVE_RAW_DATA:
			AppStore.init(action.rawData);
			AppStore.emitChange();
			break;

		case ActionTypes.RECEIVE_UPDATED_USER:
			_setUser(action.rawUser);
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

		case ActionTypes.NEW_PREDICTION:
			_events[ActionTypes.prediction.eventName].predictions.push(ActionTypes.prediction);
			AppStore.emitChange();
			break;

		default:

	}
});

module.exports = AppStore;