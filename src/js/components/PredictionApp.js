var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");


function getStateFromStores() {
	var user  = UserStore.getCurrentUser;
	var	event = EventStore.getCurrentEvent;

	return {
		user: user,
		event: event
	};
}
var PredictionApp = React.createClass({
	
	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);
		EventStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
		EventStore.removeChangeListener(this._onChange);		
	},
	render: function() {
		var sections = this.state.user.preferences.sections.map(function(ele, ind) {
				switch(ele.type) {
				case "predictions":
					return <PredictionSection selectedEvent={this.state.user.preferences.currentSelection} prediction_level={this.state.user}/>;
				case "challenges":
					return <ChallengeSection />;
				default:
					return;
				}
		}.bind(this));
		return (
				<div>
					{sections}
				</div>
			);
	}
});

module.exports = PredictionApp;