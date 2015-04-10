var React = require("react");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var AlertBox = React.createClass({

	closeAlert: function(e) {
		e.preventDefault();
		PredictionActionCreators.closeAlert();
	},

	render: function() {
		var AlertClass = (this.props.alert === "success") ? "alertBox green" : "alertBox red";

		return (
			<div className={alertClass}>
				<span>{this.props.alert.description}</span>
				<button className="button alertButton" onClick={this.closeAlert}></button>
			</div>
		);
	}
});

module.exports = AlertBox;