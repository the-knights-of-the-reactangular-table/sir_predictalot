var React = require("react/addons");


var Submission = React.createClass({
	render: function(){
		return (
			<div>
				<TextInput />
				<ImageInput />
				<CategoryInput />
				<ButtonInput />
			</div>
			);
	}
});


var TextInput = React.createClass({
	render: function(){
		return (
			<div>
				<input type="text" placeholder="Enter your prediction..."  />
			</div>
		);
	}
});


var ImageInput = React.createClass({
	render: function(){
		return (
			<div>
  				<input type="text" placeholder="Enter image url..." accept="image/*" />
			</div>
		);
	}
});


var CategoryInput = React.createClass({
	render: function(){
		return (
			<div>
  				<select>
				  <option value="sports">Sports</option>
				  <option value="politics">Politics</option>
				  <option value="dark_news">Dark News</option>
				  <option value="celebrities">Celebrities</option>
				</select>
			</div>
		);
	}
});



var ButtonInput = React.createClass({
	render: function(){
		return (
			<div>
  				<input type="submit" value="Create prediction" />
			</div>
		);
	}
});




module.exports= Submission;