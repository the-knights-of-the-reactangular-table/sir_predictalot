var React = require("react");

var Challenge = React.createClass({
	clickHandler: function(e) {
		e.preventDefault();
		this.props.onPrediction(e.target.value, "challenge");
	},
	render: function() {
		var challengeBody;
		var currentChallenge = this.props.event.challengeTopics[this.props.currentUser.topics[this.props.selectedEvent].challenge];
		if (!currentChallenge) {
			challengeBody = (
				<div className="sectionBody">
					<div className="topicName">
						<h4>You've already completed all of today's challenges</h4>
						<h5>Come back tomorrow for more</h5>
					</div>
				</div>
			);
		} else {
			challengeBody = (function(){
				switch (currentChallenge.type[0]) {
				case "binary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h4>{currentChallenge.name}</h4>
								<h5>{currentChallenge.pointForCorrect}</h5>
							</div>
							<div className="sectionBinary sectionLeft">
								<h3>{this.props.event.participants[0]}</h3>
								<button value="option1" onClick={this.clickHandler}>1</button>
							</div>
							<div className="sectionBinary sectionRight">
								<h3>{this.props.event.participants[1]}</h3>
								<button value="option2" onClick={this.clickHandler}>2</button>
							</div>
						</div>
						);
				case "unary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h4>{currentChallenge.name}</h4>
								<h5>{currentChallenge.pointForCorrect}</h5>
							</div>
							<div className="sectionUnary">{this.props.event.participants[0]}</div>
						</div>
					);
				}
			}.bind(this)());
		}
		return (
			<div className={"sectionHolder " + this.props.topic} id="Challenge">
				<div className="sectionHeader">
					<h1>Challenge</h1>
				</div>
				{challengeBody}
			</div>
		);
	}
});

module.exports = Challenge;