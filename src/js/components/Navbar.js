var React 			  = require("react");
var PredictionActions = require("../actions/PredictionActionCreators");

var Navbar = React.createClass({
	clickHandler: function(e) {
		e.preventDefault();
		PredictionActions.switchEvent(e.target.value);
	},
	render: function() {
		return(
			<div className="navbar">
				<input type="button" className="switcher left" value="left" onClick={this.clickHandler} />
				<div className="dropdown">
					<div className="optionPanel">
					</div>
					<input type="button" className="puller" />
				</div>
				<input type="button" className="switcher right" value="right" onClick={this.clickHandler} />
			</div>
		);
	}
});

module.exports = Navbar;
