var React 			  		= require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var PredictionActions 		= require("../../actions/PredictionActionCreators");

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
						<ReactCSSTransitionGroup transitionName="spinMe" className={this.props.currentEventName}>
							<span key={"hider-left"} className="hider hider-left" />
							<span key={this.props.currentEventName} className="flyer">{this.props.currentEventName}</span>
							<span key={"hider-right"} className="hider hider-right" />
						</ReactCSSTransitionGroup>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Navbar;
