var React 			  = require("react");
var PredictionActions = require("../actions/PredictionActionCreators");

var Navbar = React.createClass({

	leftHandler: function(e) {
		e.preventDefault();
		PredictionActions.previousEvent();
	},

	rightHandler: function(e) {
		e.preventDefault();
		PredictionActions.nextRandomEvent();
	},


	render: function() {
		return(
			<div className="navbar">
				<input type="button" className="switcher left" onClick={this.leftHandler} />
				<div className="dropdown">
					<div className="optionPanel">
					</div>
					<input type="button" className="puller" />
				</div>
				<input type="button" className="switcher right" onClick={this.rightHandler} />
			</div>
		);
	}
});

module.exports = Navbar;
