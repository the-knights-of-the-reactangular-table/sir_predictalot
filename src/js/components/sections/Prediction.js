var React 			  		 = require("react");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");
var SubjectStore 			 = require("../../stores/SubjectStore");
var UserStore 				 = require("../../stores/UserStore");


function getStateFromStores() {
	var currentUser  = UserStore.getCurrentUser();
	var currentEvent = currentUser.preferences.currentSelection;
	var currentTopic = currentUser.stats[currentEvent].predictions;

	return {
		topic: currentEvent,
		pred_lvl: currentTopic,
		prediction: SubjectStore.getCurrentSubject("predictions")
	};
}

var Prediction = React.createClass({

	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);
		SubjectStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
		SubjectStore.removeChangeListener(this._onChange);
	},

	clickHandler: function(e) {
		e.preventDefault();
		var predictionInfo = {
			type: "predictions",
			topic: this.state.topic,
			pred_lvl: this.state.pred_lvl,
			chosen: e.target.value
		};
		PredictionActionCreators.newPrediction(predictionInfo);
	},

	render: function() {
		var prediction = this.state.prediction;
		var predictionBody = (function(){
			switch (prediction.type[0]) {

				case "binary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h3>{prediction.name}</h3>
								<h5>{prediction.pointForCorrect}</h5>
							</div>
							<div className="sectionBinary sectionLeft">
								<h3>HardCodedBoxer1</h3>
								<button value="option1" onClick={this.clickHandler}>1</button>
							</div>
							<div className="sectionBinary sectionRight">
								<h3>HardCodedBoxer2</h3>
								<button value="option2" onClick={this.clickHandler}>2</button>
							</div>
						</div>
						);

				case "unary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h3>{prediction.name}</h3>
								<h5>{prediction.pointForCorrect}</h5>
							</div>
							<div className="sectionUnary">HardCodedBoxer1</div>
						</div>
					);

				}
			}.bind(this)());

		return (
			<div className={"sectionHolder " + this.state.topic} id="Predictions">
				<div className="sectionHeader">
					<h1>Prediction</h1>
				</div>
				{predictionBody}
			</div>
		);
	},

	_onChange: function() {
		this.setState(getStateFromStores());
	}
});

module.exports = Prediction;