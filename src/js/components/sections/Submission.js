var React = require("react/addons");


var Submission = React.createClass({
	render: function(){
		return (
			<div>
			<TextBox />
			<ImageInput />
			</div>
			);
	}
})



var TextBox = React.createClass({
	render: function(){
		return (
			<div>
			<input type="text" />
			</div>
		);
	}
})


var ImageInput = React.createClass({
	render: function(){
		return (
			<div>
  				<input type="file" accept="image/*">
			</div>
		);
	}
})
module.exports= Submission;