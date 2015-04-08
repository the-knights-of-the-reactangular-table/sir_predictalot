var React = require("react");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var cats = ["Boxing", "Racing", "Football", "Celebrities", ""];

var CSSAnim = React.createClass({

    getInitialState: function() {
        return {text: "boxing"};
    },
    clickMe: function() {
        this.setState({text: "chariot racing"});
    },
    render: function() {
        return(
            <div className="cssAnim">
                <div className="shadow">
                <div className="hider lefty"></div>
                    <ReactCSSTransitionGroup transitionName="carousel">
                        <span className="span" key={this.state.text}> {this.state.text} </span>
                    </ReactCSSTransitionGroup>
                <div className="hider righty"></div>
                </div>
            <button className="btn" onClick={this.clickMe}> Click </button>
            </div>
        );
    }
});


module.exports = CSSAnim;
