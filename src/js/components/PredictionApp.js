var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var PredictionSpinner 	= require("./sections/PredictionSpinner");
var AppStore 			= require("../stores/AppStore");
var SubmissionSection 	= require("../sections/Submission");

function getStateFromStores() {
	var currentUser  	 = AppStore.getUser();
	var currentSelection = currentUser.preferences.currentSelection;
	var predictionId 	 = currentUser.stats[currentSelection].predictions;
	var data 			 = AppStore.getData();
	var active 			 = AppStore.getActive();

	return {
		user 		     : currentUser,
		currentEventName : currentSelection,
		currentEvent 	 : AppStore.getCurrentEvent(),
		predictionId 	 : predictionId,
		current_pred  	 : AppStore.getCurrentSubject("predictions"),
		data 			 : data,
		active           : active

	};
}


var isOnPredictionPage = false;
var isOnSubmissionPage= true;


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
		
		if (isOnPredictionPage){
			return (
					<div>
						<PredictionSection currentEventName={this.state.currentEventName} predictionId={this.state.predictionId} prediction={this.state.current_pred} data={this.state.data} active={this.state.active}/>;
						{sections}
					</div>
				);
		}
		else if (isOnSubmissionPage){
			return (
					<div>
						<SubmissionSection />
					</div>
				);
		}

	


	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});




module.exports = PredictionApp;