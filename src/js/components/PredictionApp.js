var React 		 		= require("react");
var DropDownMenu 		= require("./DropDownMenu");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var ProfileSection 		= require("./sections/Profile");
var LeaderboardSection 	= require("./sections/Leaderboard");
var VersusSection 		= require("./sections/Versus");

var PredictionApp = React.createClass({
	getInitialState: function() {
		return {
			sections: 	[   {type: "Predictions", body: {left: "PredictionLeft", right: "PredictionRight"}},
						 	{type: "Challenges", body: {left: "ChallengesLeft", right: "ChallengesRight"}},
						 	{type: "Profile", body: {left: "ProfileLeft", right: "ProfileRight"}},
						 	{type: "Leaderboard", body: {left: "LeaderboardLeft", right: "LeaderboardRight"}},
						 	{type: "Versus", body: {left: "VersusLeft", right: "VersusRight"}}
						]
		};
	},
	render: function() {
		var sections = this.state.sections.map(function(ele, ind) {
				switch(ele.type) {
				case "Predictions":
					return <PredictionSection header={ele.type} body={ele.body}/>;
				case "Challenges":
					return <ChallengeSection header={ele.type} body={ele.body}/>;
				case "Profile":
					return <ProfileSection header={ele.type} body={ele.body}/>;
				case "Leaderboard":
					return <ProfileSection header={ele.type} body={ele.body}/>;
				case "Versus":
					return <ProfileSection header={ele.type} body={ele.body}/>;
				default:
					return;
				}
		}.bind(this));
		return (
				<div>
					<DropDownMenu/>
					{sections}
				</div>
			);
	}
});

module.exports = PredictionApp;