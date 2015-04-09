var React 			  = require("react");
var PredictionActions = require("../../actions/PredictionActionCreators");

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
			<div className={"spinnerHolder " + this.props.currentEventName}>
				<input type="button" className="switcher left" onClick={this.leftHandler} />
				<input type="button" className="switcher right" onClick={this.rightHandler} />
				<div className="sectionHeader spinner">
					<div className={"spinnerBlock " + this.props.currentEventName}>
						<span className="hider hider-left" />
						<span className="flyer" key={this.props.currentEventName}>{this.props.currentEventName}</span>
						<span className="hider hider-right" />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Navbar;
