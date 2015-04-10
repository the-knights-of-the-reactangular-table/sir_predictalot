var keyMirror = require("react/lib/keyMirror");

module.exports = {

	ActionTypes: keyMirror({

		// User action types
		NEW_SWIPE: null,

		NAVIGATE_TO: null,

		CREATE_CUSTOM_PREDICTION: null,

		CLOSE_ALERT: null,

		// API action types
		RECEIVE_RAW_DATA: null,

		RECEIVE_ALERT: null,

		RECEIVE_RAW_PREDICTIONS: null,

		RECEIVE_UPDATED_USER: null
	})

};