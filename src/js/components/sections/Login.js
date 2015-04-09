var React = require("react");
var ActionCreator = require("../../actions/PredictionActionCreators.js");

var Login = React.createClass({

	onSubmit: function(e) {
	    e.preventDefault();
	    var username= this.refs.username.getDOMNode().value;
	    ActionCreator.login(username);
	},

	render: function() {
	    return (
	        <div className="LPage">
	            <img className="imaage" src="glyphicons-43-pie-chart.png" alt="" />
	            <form className="LC">
	                <input type="text" ref="username" placeholder="username" />
	                <button id="lbutton"type="submit" onClick={this.onSubmit}>Login</button>
	            </form>
	        </div>
	    );
	}
});

module.exports = Login;