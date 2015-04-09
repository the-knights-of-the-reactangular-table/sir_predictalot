var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var AppStore 			= require("../stores/AppStore");
var SubmissionSection   = require("./sections/Submission");
var LoginSection 		= require("./sections/Login");

function getStateFromStores() {

	var currentUser  = AppStore.getUser();
	var predictions  = AppStore.getPredictions();
	var active 		 = AppStore.getActive();
	var route		 = AppStore.getRoute();

	return {
		user 		     : currentUser,
		predictions 	 : predictions,
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
		console.log(this.state);

		if(this.state.route === "login") {
			return (
				<div>
					<LoginSection />
				</div>
				);
		} else if (this.state.route === "submission") {
			return (
				<div>
					<SubmissionSection user={this.state.user} />
				</div>
			);
		} else if (this.state.route === "prediction") {
			return (
				<div>
					<PredictionSection username={this.state.user.username} predictions={this.state.predictions} active={this.state.active}/>
				</div>
			);
		}
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});


module.exports = PredictionApp;
