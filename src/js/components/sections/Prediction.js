var React 			  		 = require("react");
var PredictionActions 		 = require("../../actions/PredictionActionCreators");

var Prediction = React.createClass({

	clickHandler: function(e) {
		e.preventDefault();
		var predictionInfo = {
			username: this.props.username,
			type: "predictions",
			topic: this.props.currentEventName,
			pred_id: this.props.predictionId,
			chosen: e.target.value
		};
		PredictionActions.makePrediction(predictionInfo);
	},

	render: function() {
		var prediction = this.props.prediction;
		var predictionBody = (function(){
			if(!prediction) {
				return (
					<div className="sectionBody">
						<div className="topicName completion">
							<h3>All predictions completed</h3>
							<h5>Try another topic, or submit your own!</h5>
						</div>
					</div>
				);
			}

			switch (prediction.type[0]) {

				case "binary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h3>{prediction.name}</h3>
								<h5>{prediction.pointsForCorrect}</h5>
							</div>
							<div className="sectionBinary sectionLeft">
								<button value="option1" onClick={this.clickHandler} className="swipe swipe-left" />
							</div>
							<div className="imageHolder">
							</div>
							<div className="sectionBinary sectionRight">
								<button value="option2" onClick={this.clickHandler} className="swipe swipe-right" />
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
							<div className="sectionUnary">
								<input type="range" />
							</div>
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