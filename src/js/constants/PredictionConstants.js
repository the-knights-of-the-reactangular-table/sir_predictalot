var keyMirror = require("react/lib/keyMirror");

module.exports = {

	ActionTypes: keyMirror({

		// User action types
		NEW_SWIPE: null,

		NAVIGATE_TO: null,

		REMOVE_TOPIC: null,
		CREATE_CUSTOM_PREDICTION: null,

		// API action types
		RECEIVE_RAW_DATA: null,

		RECEIVE_RAW_PREDICTIONS: null,

		RECEIVE_UPDATED_USER: null
	})

};