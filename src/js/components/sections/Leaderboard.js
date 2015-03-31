var React = require("react");

var Leaderboard = React.createClass({
	render: function() {

		var userArray = [];
		for (var user in this.props.users) {
			if(this.props.users.hasOwnProperty(user)) {
				userArray.push(this.props.users[user]);
			}
		}


		var leaders = userArray.sort(function(a, b) {
				return b.points > a.points;
			}).map(function(ele, ind) {
				return (
					<div className="leaderitem">
						<span className="leadername">{ele.username}</span>
						<span className="leaderpoints">{ele.points}</span>
					</div>
				);
			});

		return (
			<div className="sectionHolder" id="Prediction">
				<div className="sectionHeader">
					<h1>{this.props.header}</h1>
				</div>
				<div className="sectionBody">
					{leaders}
				</div>
			</div>
		);
	}
});

module.exports = Leaderboard;