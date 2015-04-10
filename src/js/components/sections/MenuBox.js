var React = require("react");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");

var MenuBox = React.createClass({

	clickHandler: function(){
		var route = "submission";
		PredictionActionCreators.navigateTo(route);

	},

	deleteHandler: function() {
		var deleteMe = {
			topic: this.props.topic,
			username: this.props.username
		};
		if (this.props.topic) {
			PredictionActionCreators.removeTopic(deleteMe);
		}
	},

	render: function(){
		return (
			<div className="menuBox">
				<button className="button delete_button" onClick={this.deleteHandler} />
				<button className="button add_button"  onClick={this.clickHandler}/>
			</div>
		);
	}
});

module.exports = MenuBox;