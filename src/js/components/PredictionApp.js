var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var PredictionSpinner 	= require("./sections/PredictionSpinner");
var AppStore 			= require("../stores/AppStore");


function getStateFromStores() {
	var currentUser  	 = AppStore.getUser();
	var currentSelection = currentUser.preferences.currentSelection;
	var predictionId 	 = currentUser.stats[currentSelection].predictions;
	var data 			 = AppStore.getData();

	return {
		data 			 : data
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
				<PredictionSection currentEventName={this.state.currentEventName} predictionId={this.state.predictionId} prediction={this.state.current_pred} data={this.state.data} />;
			</div>
		);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});

module.exports = PredictionApp;