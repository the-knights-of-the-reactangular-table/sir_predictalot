var React = require("react");

var Profile = React.createClass({
	render: function() {
		return (
			<div className={"sectionHolder " + this.props.topic} id="Profile">
				<div className="sectionHeader">
					<h1>Profile</h1>
				</div>
				<div className="sectionBody">
					<div className="section sectionSingle">
						<ul>{this.props.user.username}</ul>
						<ul>{this.props.user.points}</ul>
					</div>
					<div className="section sectionSingle">
						<ul>{this.props.user.topics[this.props.topic].name}: {this.props.user.topics[this.props.topic].points}</ul>
					</div>
				</div>
			</div>
		);
	}
});
// How do I make it for every topic they have?

module.exports = Profile;