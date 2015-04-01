var keyMirror = require("react/lib/keyMirror");

module.exports = {
	ActionTypes: keyMirror({
		NEW_PREDICTION: null,
		CHALLENGE_USER: null,
		SWITCH_TOPIC: null,
		RECEIVE_RAW_DATA: null,
		RECEIVE_CREATED_PREDICTION: null,
		RECEIVE_UPDATED_USER: null
	})
};