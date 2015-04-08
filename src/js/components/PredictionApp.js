var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var PredictionCreator 	= require("./sections/PredictionCreator");
var PredictionSpinner 	= require("./sections/PredictionSpinner");
var AppStore 			= require("../stores/AppStore");


function getStateFromStores() {
	var currentUser  	 = AppStore.getUser();
	var currentSelection = currentUser.preferences.currentSelection;
	var predictionId 	 = currentUser.stats[currentSelection].predictions;

	return {
		user 		     : currentUser,
		currentEventName : currentSelection,
		currentEvent 	 : AppStore.getCurrentEvent(),
		eventsList 		 : AppStore.getEventsList(),
		predictionId 	 : predictionId,
		current_pred  	 : AppStore.getCurrentSubject("predictions")

	};
}

var PredictionApp = React.createClass({

	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div>
				<PredictionSpinner currentEventName={this.state.currentEventName} />
				<PredictionSection currentEventName={this.state.currentEventName} predictionId={this.state.predictionId} prediction={this.state.current_pred} username={this.state.user.username} />
				<PredictionCreator currentEventName={this.state.currentEventName} events={this.state.eventsList} username={this.state.user.username} />
			</div>
		);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});

module.exports = PredictionApp;