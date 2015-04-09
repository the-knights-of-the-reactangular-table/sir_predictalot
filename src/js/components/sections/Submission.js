var React = require("react/addons");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var SubmissionForm = React.createClass({

	getFormInput: function(e) {
		e.preventDefault();
		var data = {
			inputText: this.refs.inputText.getDOMNode().value,
			inputURL: this.refs.inputURL.getDOMNode().value,
			inputCategory: this.refs.inputCategory.getDOMNode().value
		};

		PredictionActionCreators.getFormInput(data);
	},

	render: function(){

		var dummy_selectOptions = ['sports','celebrities', 'politics','dark', 'funny'];

		var selectOptions = dummy_selectOptions.map(function(category){
			return (
				<option value={category}>{category}</option>
			);
		});

		return (
			<div>
				<form onSubmit={this.getFormInput}>
					<input type="text" ref="inputText" placeholder="Enter your prediction..."  />
	  				<input type="text" ref="inputURL" placeholder="Enter image url..." />
	  				<select ref="inputCategory">
	  				{selectOptions}
	  				</select>
	  				<input type="submit" value="Create prediction" />
	  			</form>
			</div>
		);
	}
});


module.exports= SubmissionForm;
