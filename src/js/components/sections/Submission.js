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
		return (
			<div>
				<form onSubmit={this.getFormInput}>
					<input type="text" ref="inputText" placeholder="Enter your prediction..." className="subText subForm" />
	  				<input type="text" ref="inputURL" placeholder="Enter image url..." className="subURL subForm" />
					<select ref="inputCategory" className="subCategory subForm">
					  <option value="sports">Sports</option>
					  <option value="politics">Politics</option>
					  <option value="dark_news">Dark News</option>
					  <option value="celebrities">Celebrities</option>
					</select>
	  				<input type="submit" value="Create prediction!   ✔" className="subButton subForm"/>
	  			</form>
			</div>
		);
	}
});


module.exports= SubmissionForm;
