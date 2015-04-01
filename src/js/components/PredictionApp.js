var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");


function getStateFromStores() {
	return {
		user: UserStore.getCurrentUser,
		event: EventStore.getCurrentEvent
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
					return <PredictionSection />;
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