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
	onPrediction: function(selectedOption, type) {
		this.setState(function(prevState, currentProps){
			var thisEvent 		= prevState.selectedEvent;
			var thisUsername  	= prevState.currentUser;
			var thisUser 		= prevState.users[thisUsername];
			var predictorArray;
			var eventArrayToModify;
			var userPanelDisplayCounter;

			if (type === "prediction") {
				eventArrayToModify = "predictionTopics";
				userPanelDisplayCounter = "topic";
			} else if (type === "challenge") {
				eventArrayToModify = "challengeTopics";
				userPanelDisplayCounter = "challenge";
			}
			// Recording user as having voted a certain way
			predictorArray = prevState.events[thisEvent][eventArrayToModify][thisUser.topics[thisEvent][userPanelDisplayCounter]][selectedOption];
			predictorArray.push(thisUsername);
			// Adjusting User's Points
			thisUser.topics[thisEvent].points += prevState.events[thisEvent].predictionTopics[thisUser.topics[thisEvent].topic.pointForCorrect];
			thisUser.points += prevState.events[thisEvent].predictionTopics[thisUser.topics[thisEvent].topic].pointForCorrect;
			// Recording which event topics they have already voted on
			thisUser.topics[thisEvent][userPanelDisplayCounter] += 1;

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
					return <PredictionSection topic={this.state.selectedEvent} selectedEvent={this.state.selectedEvent} event={this.state.events[this.state.selectedEvent]} currentUser={this.state.users[this.state.currentUser]} onPrediction={this.onPrediction}/>;
				case "Challenges":
					return <ChallengeSection topic={this.state.selectedEvent} selectedEvent={this.state.selectedEvent} event={this.state.events[this.state.selectedEvent]} currentUser={this.state.users[this.state.currentUser]} onPrediction={this.onPrediction}/>;
				case "Profile":
					return <ProfileSection topic={this.state.selectedEvent} body={ele.body}/>;
				case "Leaderboard":
					return <LeaderboardSection topic={this.state.selectedEvent} users={this.state.users}/>;
				case "Versus":
					return <VersusSection topic={this.state.selectedEvent} body={ele.body}/>;
				default:
					return;
				}
		}.bind(this));
		return (
				<div>
					<div className="navbar">
						<button className="switcher left">
							<img src="/build/assets/img/glyphicon-left.png" />
						</button>
						<DropDownMenu />
						<button className="switcher right">
							<img src="/build/assets/img/glyphicon-right.png" />
						</button>
					</div>
					{sections}
				</div>
			);
	}
});

module.exports = PredictionApp;