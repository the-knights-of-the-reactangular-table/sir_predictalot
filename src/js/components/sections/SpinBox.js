var React = require("react/addons");
var ReactCSSTransitionGroup  = React.addons.CSSTransitionGroup;


var SpinBox = React.createClass({
	render: function() {
		return(
			<div className="spin-holder">
				<span className="hider hider-left" />
				<ReactCSSTransitionGroup transitionName="spinner">
					<div key={Math.random()} className="titleholder">{this.props.topic}</div>
				</ReactCSSTransitionGroup>
				<span className="hider hider-right" />
			</div>
		);
	}
});

module.exports = SpinBox;