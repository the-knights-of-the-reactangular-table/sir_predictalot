var keyMirror = require("react/lib/keyMirror");

module.exports = {
	ActionTypes: keyMirror({

		// User action types
		MAKE_PREDICTION: null,
		RECEIVE_SWIPE: null,

		REMOVE_TOPIC: null,
		CREATE_CUSTOM_PREDICTION: null,

		// API action types
		RECEIVE_RAW_DATA: null,

		RECEIVE_RAW_EVENT: null,

		RECEIVE_UPDATED_USER: null
	})

};