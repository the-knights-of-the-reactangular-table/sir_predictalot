var React 		 		= require("react");
var Navbar 				= require("./Navbar");
var PredictionSection 	= require("./sections/Prediction");
var ChallengeSection 	= require("./sections/Challenge");
var ProfileSection 		= require("./sections/Profile");
var LeaderboardSection 	= require("./sections/Leaderboard");
var VersusSection 		= require("./sections/Versus");
var TopicsSection		= require("./sections/Topics");
var Data 				= require("../ExampleData.js");

var PredictionApp = React.createClass({
	getInitialState: function() {
		var users = Data.UserStore;
		var currentUser = "JASON";
		return {
			sections: 	[   {type: "Predictions", body: {left: "PredictionLeft", right: "PredictionRight"}},
						 	{type: "Challenges", body: {left: "ChallengesLeft", right: "ChallengesRight"}},
						 	{type: "Profile", body: {left: "ProfileLeft", right: "ProfileRight"}},
						 	{type: "Leaderboard", body: {left: "LeaderboardLeft", right: "LeaderboardRight"}},
						 	{type: "Versus", body: {left: "VersusLeft", right: "VersusRight"}},
						 	{type: "Topics", body: {left: "TopicsLeft", right: "TopicsRight"}}
						],
			users: Data.UserStore,
			events: Data.EventStore,
			currentUser: currentUser,
			selectedEvent: Data.UserStore[currentUser].selectedEvent
		};
	},
	onSelection: function(selectedTopic) {
		this.setState(function(prevState, currentProps){
			console.log(selectedTopic.toString());
			var s = selectedTopic.toString();
			var thisUsername = prevState.currentUser;
			var thisUser = prevState.users[thisUsername];
			console.log(thisUser);
			var Pref = thisUser.eventPreferences;
			console.log(Pref);
			var index = Pref.indexOf(s);
			console.log(index);
			if (index !== -1) {
				Pref.splice([index], 1);
			} else {
				Pref.push(s);
			}
			return {
				users: prevState.users
			};
		})
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
			console.log(type);
			console.log(userPanelDisplayCounter);
			// Recording user as having voted a certain way
			predictorArray = prevState.events[thisEvent][eventArrayToModify][thisUser.topics[thisEvent][userPanelDisplayCounter]][selectedOption];
			predictorArray.push(thisUsername);
			// Adjusting User's Points
			thisUser.topics[thisEvent].points += prevState.events[thisEvent].predictionTopics[thisUser.topics[thisEvent].topic].pointForCorrect;
			thisUser.points += prevState.events[thisEvent].predictionTopics[thisUser.topics[thisEvent].topic].pointForCorrect;
			// Recording which event topics they have already voted on
			thisUser.topics[thisEvent][userPanelDisplayCounter] += 1;

			return {
				users: prevState.users,
				events: prevState.events,
			};
		});
	},
	switchEvent: function(direction) {
		this.setState(function(prevState) {
			var thisEvent 		= prevState.selectedEvent;
			var thisUsername  	= prevState.currentUser;
			var thisUser 		= prevState.users[thisUsername];

			var selectedEvent;
			if (thisUser.eventPreferences.indexOf(thisEvent) === 0 && direction === -1) {
				selectedEvent 	= thisUser.eventPreferences[thisUser.eventPreferences.length];
			} else if (thisUser.eventPreferences.indexOf(thisEvent) === thisUser.eventPreferences.length-1 && direction === 1) {
				selectedEvent 	= thisUser.eventPreferences[0];
			} else {
				selectedEvent 	= thisUser.eventPreferences[thisUser.eventPreferences.indexOf(thisEvent) + direction];
			}


			console.log("index of this current event", thisUser.eventPreferences.indexOf(thisEvent));
			console.log("direction", direction);
			console.log(thisEvent);
			console.log(selectedEvent);
			console.log(thisUser.eventPreferences);
			return {
				users: prevState.users,
				selectedEvent: selectedEvent
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
					return <ProfileSection topic={this.state.selectedEvent} body={ele.body} user={this.state.users[this.state.currentUser]}/>;
				case "Leaderboard":
					return <LeaderboardSection topic={this.state.selectedEvent} users={this.state.users}/>;
				case "Versus":
					return <VersusSection topic={this.state.selectedEvent} body={ele.body}/>;
				case "Topics":
					return <TopicsSection topic={this.state.selectedEvent} body={ele.body} event={this.state.events} onSelection={this.onSelection}/>;
				default:
					return;
				}
		}.bind(this));
		return (
				<div>
					<Navbar switchEvent={this.switchEvent}/>
					{sections}
				</div>
			);
	}
});

module.exports = PredictionApp;