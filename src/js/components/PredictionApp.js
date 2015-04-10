var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var AppStore 			= require("../stores/AppStore");
var SubmissionSection   = require("./sections/Submission");
var LoginSection 		= require("./sections/Login");
var AlertBox 			= require("./sections/AlertBox");

function getStateFromStores() {

	var currentUser  = AppStore.getUser();
	var prediction   = AppStore.getPrediction();
	var active 		 = AppStore.getActive();
	var route		 = AppStore.getRoute();
	var alert 		 = AppStore.getCurrentAlert();


	return {
		user 		     : currentUser,
		prediction  	 : prediction,
		active           : active,
		route   		 : route,
		alert 			 : alert
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
		var extras;
		if (this.state.alert) {
			extras = <AlertBox alert={this.state.alert}/>;
		}

		if(this.state.route === "login") {
			return (
				<div className="app-wrapper">
					<LoginSection />
				</div>
				);
		} else if (this.state.route === "submission") {
			return (
				<div className="app-wrapper">
					<SubmissionSection user={this.state.user} />
				</div>
			);

		} else if (this.state.route === "prediction") {
			return (
				<div className="app-wrapper">
					<PredictionSection username={this.state.user.username} prediction={this.state.prediction} active={this.state.active}/>
				</div>
			);
		}
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});


module.exports = PredictionApp;
