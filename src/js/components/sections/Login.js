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
	            <img className="imaage" src="/assets/img/glyphicon-bank.png" alt="" />
	            <form className="LC" onSubmit={this.onSubmit}>
	                <input type="text" ref="username" />
	                <button id="lbutton"type="submit" onClick={this.onSubmit}></button>
	            </form>
	        </div>
	    );
	}
});

module.exports = Login;