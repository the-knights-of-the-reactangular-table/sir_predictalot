var keyMirror = require("react/lib/keyMirror");

module.exports = {
	ActionTypes: keyMirror({

		NEW_PREDICTION: null,
		CHALLENGE_USER: null,

		RECEIVE_RAW_DATA: null,

		RECEIVE_RAW_EVENT: null,
		RECEIVE_RAW_NEW_EVENTS: null,
		RECEIVE_RAW_UPDATED_EVENTS: null,

		SWITCH_CURRENT_EVENT: null,
		RECEIVE_UPDATED_USER: null,
		RECEIVE_CREATED_PREDICTION: null

	})
};