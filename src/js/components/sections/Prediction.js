var React = require("react");

var Prediction = React.createClass({
	render: function() {
		return (
			<div className="sectionHolder" id="Prediction">
				<div className="sectionHeader">
					<h1>{this.props.header}</h1>
				</div>
				<div className="sectionBody">
					<div className="section sectionLeft">{this.props.body.left}</div>
					<div className="section sectionRight">{this.props.body.right}</div>
				</div>
			</div>
		);
	}
});

module.exports = Prediction;