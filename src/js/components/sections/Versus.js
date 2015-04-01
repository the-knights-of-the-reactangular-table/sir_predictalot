var React = require("react");

var Versus = React.createClass({
	render: function() {
		return (
			<div className={"sectionHolder " + this.props.topic} id="Versus">
				<div className="sectionHeader">
					<h1>Versus</h1>
				</div>
				<div className="sectionBody">
					<div className="section sectionLeft">{this.props.body.left}</div>
					<div className="section sectionRight">{this.props.body.right}</div>
				</div>
			</div>
		);
	}
});

module.exports = Versus;