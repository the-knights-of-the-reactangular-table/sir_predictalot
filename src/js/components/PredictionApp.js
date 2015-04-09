var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var PredictionSpinner 	= require("./sections/PredictionSpinner");
var AppStore 			= require("../stores/AppStore");
var SubmissionSection   = require("./sections/Submission");

function getStateFromStores() {

	var currentUser  	 = AppStore.getUser();
	var currentSelection = currentUser.preferences.currentSelection;
	var predictionId 	 = currentUser.stats[currentSelection].predictions;
	var data 			 = AppStore.getData();
	var active 			 = AppStore.getActive();
	var route			 = AppStore.getRoute();

	return {
		user 		     : currentUser,
		currentEventName : currentSelection,
		currentEvent 	 : AppStore.getCurrentEvent(),
		predictionId 	 : predictionId,
		current_pred  	 : AppStore.getCurrentSubject("predictions"),
		data 			 : data,
		active           : active,
		route   		 : route
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

		if (this.state.route.submission) {
			return (
				<div>
					<SubmissionSection currentUser={this.state.currentUser}/>
				</div>
			);
		} else if (this.state.route.prediction) {
			return (
				<div>
					<PredictionSection currentEventName={this.state.currentEventName} predictionId={this.state.predictionId} prediction={this.state.current_pred} data={this.state.data} active={this.state.active}/>
				</div>
			);
		}
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});


module.exports = PredictionApp;
