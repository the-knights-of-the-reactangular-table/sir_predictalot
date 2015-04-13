var React 		 		= require("react");
var PredictionSection 	= require("./sections/Prediction");
var AppStore 			= require("../stores/AppStore");
var SubmissionSection   = require("./sections/Submission");
var LoginSection 		= require("./sections/Login");
var AlertBox 			= require("./sections/AlertBox");

function getStateFromStores() {
	return {
		user 		     : AppStore.getUser(),
		prediction  	 : AppStore.getPrediction(),
		active           : AppStore.getActive(),
		route   		 : AppStore.getRoute(),
		alert 			 : AppStore.getCurrentAlert()
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
		var section;

		if (this.state.alert) {
			extras = <AlertBox alert={this.state.alert} />;
		}

		if(this.state.route === "login") {
			section = <LoginSection />;
		} else if (this.state.route === "submission") {
			section = <SubmissionSection user={this.state.user} />;
		} else if (this.state.route === "prediction") {
			section = <PredictionSection username={this.state.user.username} prediction={this.state.prediction} active={this.state.active}/>;
		}

		return (
			<div className="app-wrapper">
				{extras}
				{section}
			</div>
			);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});


module.exports = PredictionApp;
