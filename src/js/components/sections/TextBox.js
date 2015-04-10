var React = require("react");

var TextBox = React.createClass({

    render: function() {
	    return(
	        <div className="textBox">
	       		{this.props.text}
	        </div>
	    );
    }

});

module.exports = TextBox;