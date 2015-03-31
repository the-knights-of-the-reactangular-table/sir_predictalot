var React = require("react");

var Prediction = React.createClass({
	clickHandler: function(e) {
		e.preventDefault();
		this.props.onPrediction(e.target.value, "prediction");
	},
	render: function() {
			var currentPrediction = this.props.event.predictionTopics[this.props.currentUser.topics[this.props.selectedEvent].topic];
			var predictionBody = (function(){
				switch (currentPrediction.type[0]) {
				case "binary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h4>{currentPrediction.name}</h4>
								<h5>{currentPrediction.pointForCorrect}</h5>
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
								<h4>{currentPrediction.name}</h4>
								<h5>{currentPrediction.pointForCorrect}</h5>
							</div>
							<div className="sectionUnary">{this.props.event.participants[0]}</div>
						</div>
					);
				}
			}.bind(this)());
		return (
			<div className={"sectionHolder " + this.props.topic} id="Prediction">
				<div className="sectionHeader">
					<h1>Prediction</h1>
				</div>
				{predictionBody}
			</div>
		);
	}
});

module.exports = Prediction;