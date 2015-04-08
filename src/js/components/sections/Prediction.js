var React 			  		 = require("react");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");

var Prediction = React.createClass({

	clickHandler: function(e) {
		e.preventDefault();
		var predictionInfo = {
			type: "predictions",
			topic: this.props.currentEventName,
			pred_id: this.props.predictionId,
			chosen: e.target.value
		};
		PredictionActionCreators.newPrediction(predictionInfo);
	},

	render: function() {
		var prediction = this.props.prediction;
		var predictionBody = (function(){

			switch (prediction.type[0]) {

				case "binary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h3>{prediction.name}</h3>
								<h5>{prediction.pointsForCorrect}</h5>
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
								<h5>{prediction.pointsForCorrect}</h5>
							</div>
							<div className="sectionUnary">HardCodedBoxer1</div>
						</div>
					);

				}
			}.bind(this)());

		return (
			<div className={"sectionHolder " + this.props.currentEventName} id="Predictions">
				<div className="sectionHeader">
					<h1>Prediction</h1>
				</div>
				{predictionBody}
			</div>
		);
	}

});

module.exports = Prediction;