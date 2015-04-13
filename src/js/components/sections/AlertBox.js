var React = require("react");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var AlertBox = React.createClass({

	closeAlert: function(e) {
		e.preventDefault();
		PredictionActionCreators.closeAlert();
	},

	render: function() {
		var alertClass = (this.props.alert.alert === "success") ? "alertBox blue" : "alertBox red";

		return (
			<div className={alertClass}>
				<span id="alert-span">{this.props.alert.description}</span>
				<button className="button alert-button" onClick={this.closeAlert}>
					<img src="/assets/img/glyphicon-remove.png" className="close-image" />
				</button>
			</div>
		);
	}
});

module.exports = AlertBox;