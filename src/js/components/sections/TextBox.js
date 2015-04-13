var React = require("react");

var TextBox = React.createClass({

    render: function() {
	    return(
	        <div className="textBox">
	       		<h4>{this.props.text}</h4>
	        </div>
	    );
    }

});

module.exports = TextBox;