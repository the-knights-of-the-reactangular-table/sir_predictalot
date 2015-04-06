var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var Navbar 				= require("./Navbar");
var UserStore 			= require("../stores/UserStore");
var EventStore 			= require("../stores/EventStore");
var SubjectStore 		= require("../stores/SubjectStore");


function getStateFromStores() {
	var currentUser  = UserStore.getCurrentUser();
	var currentEvent = currentUser.preferences.currentSelection;
	var currentTopic = currentUser.stats[currentEvent].predictions;

	return {
		user 		: currentUser,
		topic 		: currentEvent,
		event 		: EventStore.getCurrentEvent(),
		pred_number : currentTopic,
		current_pred: SubjectStore.getCurrentSubject("predictions")

	};
}

var PredictionApp = React.createClass({

	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);
		EventStore.addChangeListener(this._onChange);
		SubjectStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
		EventStore.removeChangeListener(this._onChange);
		SubjectStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var preferences = this.state.user.preferences;
		var sections = preferences.sections.map(function(ele, ind) {
				switch(ele) {

					case "predictions":
						return <PredictionSection key={ele} topic={this.state.topic} pred_number={this.state.pred_number} prediction={this.state.current_pred}/>;

					case "challenges":
						return <ChallengeSection key={ele}/>;

					default:
						return;
				}
		}, this);
		return (
			<div>
				<Navbar />
				{sections}
			</div>
		);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});

module.exports = PredictionApp;