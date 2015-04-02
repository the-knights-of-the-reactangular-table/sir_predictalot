var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var UserStore 			= require("../stores/UserStore");
var EventStore 			= require("../stores/EventStore");
var React 		 		= require("react");


function getStateFromStores() {
	return {
		user: UserStore.getCurrentUser(),
		event: EventStore.getCurrentEvent(),
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
		var preferences = this.state.user.preferences;
		var sections = preferences.sections.map(function(ele, ind) {
				switch(ele) {

					case "predictions":
						return <PredictionSection key={ele}/>;

					case "challenges":
						return <ChallengeSection key={ele}/>;

					default:
						return;
				}
		}.bind(this));
		return (
			<div>
				{sections}
			</div>
		);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});

module.exports = PredictionApp;