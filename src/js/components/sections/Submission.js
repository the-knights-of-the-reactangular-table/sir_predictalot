var React = require("react/addons");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var SubmissionForm = React.createClass({

	getFormInput: function(e) {
		e.preventDefault();
		var data = {
			username: this.props.user.username,
			inputText: this.refs.inputText.getDOMNode().value,
			inputURL: this.refs.inputURL.getDOMNode().value,
			inputCategory: this.refs.inputCategory.getDOMNode().value
		};

		PredictionActionCreators.getFormInput(data);
	},

	clickHandler: function(e) {
		e.preventDefault();
		var place = "prediction";
		PredictionActionCreators.navigateTo(place);
	},

	render: function(){
		var topicOptions = this.props.user.preferences.topics.map(function(topic) {
			return (
				<option value={topic}>{topic.split("")[0].toUpperCase() + topic.slice(1)}</option>
				);
		});

		return (
			<div>
				<button onClick={this.clickHandler} />
				<form onSubmit={this.getFormInput}>
					<input type="text" ref="inputText" placeholder="Enter your prediction..."  />
	  				<input type="text" ref="inputURL" placeholder="Enter image url..." />
					<select ref="inputCategory">
					  {topicOptions}
					</select>
	  				<input type="submit" value="Create prediction" />
	  			</form>
			</div>
		);
	}
});


module.exports= SubmissionForm;
