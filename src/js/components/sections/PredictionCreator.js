var React = require("react");
var PredictionActions = require("../../actions/PredictionActionCreators");

var PredictionCreator = React.createClass({

	submitHandler: function(e) {
		e.preventDefault();
		var info = {
			username: this.props.username,
			topic: this.refs.topic.getDOMNode().value,
			text: this.refs.text.getDOMNode().value,
			imgURL: this.refs.imgURL.getDOMNode().value
		};

		PredictionActions.submitCustomPrediction(info);
	},
	
	render: function() {
		var options = this.props.events.map(function(ele) {
			return (<option value={ele} key={ele}>{ele.split("")[0].toUpperCase() + ele.slice(1)}	</option>);
		});
		
		return (
			<div className={"sectionHolder " + this.props.currentEventName} id="Predictions">
				<div className="sectionHeader">
					<h1>Make Your Own</h1>
				</div>
				<div className="sectionBody">
					<form id="predictionCreator" onSubmit={this.submitHandler}>
						<select ref="topic" form="predictionCreator">
							{options}
						</select>
						<input type="text" ref="text" placeholder="Make your custom prediction" />
						<input type="text" ref="imgURL" placeholder="Enter your image url" />
						<button >Create</button>
					</form>
				</div>		
			</div>
		);
	}

});

module.exports = PredictionCreator;