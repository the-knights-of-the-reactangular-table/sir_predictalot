var React 		 		= require("react");
var DropDownMenu 		= require("./DropDownMenu");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var ProfileSection 		= require("./sections/Profile");
var LeaderboardSection 	= require("./sections/Leaderboard");
var VersusSection 		= require("./sections/Versus");
var Data 				= require("../ExampleData.js");

var PredictionApp = React.createClass({
	getInitialState: function() {
		var users = Data.UserStore;
		var currentUser = "MIJOTHY";
		return {
			sections: 	[   {type: "Predictions", body: {left: "PredictionLeft", right: "PredictionRight"}},
						 	{type: "Challenges", body: {left: "ChallengesLeft", right: "ChallengesRight"}},
						 	{type: "Profile", body: {left: "ProfileLeft", right: "ProfileRight"}},
						 	{type: "Leaderboard", body: {left: "LeaderboardLeft", right: "LeaderboardRight"}},
						 	{type: "Versus", body: {left: "VersusLeft", right: "VersusRight"}}
						],
			users: Data.UserStore,
			events: Data.EventStore,
			currentUser: currentUser,
			selectedEvent: Data.UserStore[currentUser].selectedEvent
		};
	},
	onPrediction: function(selectedOption) {
		this.setState(function(prevState, currentProps){
			var thisEvent 		= prevState.selectedEvent;
			var thisUsername  	= prevState.currentUser;
			var thisUser 		= prevState.users[thisUsername];
			var predictorArray  = prevState.events[thisEvent].predictionTopics[thisUser.topics[thisEvent].topic][selectedOption];
				predictorArray.push(thisUsername);
				thisUser.topics[thisEvent].topic += 1;
				console.log(prevState);
			return {
				users: prevState.users,
				events: prevState.events,
			};
		});
	},
	render: function() {
		var sections = this.state.sections.map(function(ele, ind) {
				switch(ele.type) {
				case "Predictions":
					return <PredictionSection header={ele.type} selectedEvent={this.state.selectedEvent} event={this.state.events[this.state.selectedEvent]} currentUser={this.state.users[this.state.currentUser]} onPrediction={this.onPrediction}/>;
				case "Challenges":
					return <ChallengeSection header={ele.type} body={ele.body}/>;
				case "Profile":
					return <ProfileSection header={ele.type} body={ele.body}/>;
				case "Leaderboard":
					return <LeaderboardSection header={ele.type} users={this.state.users}/>;
				case "Versus":
					return <VersusSection header={ele.type} body={ele.body}/>;
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