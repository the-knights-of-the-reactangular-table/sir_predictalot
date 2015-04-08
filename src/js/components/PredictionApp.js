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
		user 		     : currentUser,
		currentEventName : currentSelection,
		currentEvent 	 : AppStore.getCurrentEvent(),
		predictionId 	 : predictionId,
		current_pred  	 : AppStore.getCurrentSubject("predictions"),
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
		console.log('user in PredictionApp: ', this.state.user);
		console.log('data in PredictionApp: ', this.state.data);
		var preferences = this.state.user.preferences;
		var sections = preferences.sections.map(function(ele, ind) {
				switch(ele) {

					case "challenges":
						return <ChallengeSection key={ele}/>;

					default:
						return;
				}
		}, this);
		return (
			<div>
				<PredictionSpinner currentEventName={this.state.currentEventName} />
				<PredictionSection currentEventName={this.state.currentEventName} predictionId={this.state.predictionId} prediction={this.state.current_pred} data={this.state.data} />;
				{sections}
			</div>
		);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});

module.exports = PredictionApp;