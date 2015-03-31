var React = require("react");

var Navbar = React.createClass({
	clickHandler: function(e) {
		e.preventDefault();
		if (e.target.value === "right") {
			this.props.switchEvent(1);
		} else if (e.target.value === "left") {
			this.props.switchEvent(-1);
		}
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
