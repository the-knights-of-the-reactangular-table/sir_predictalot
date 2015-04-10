var React = require("react");

var ErrorBox = React.createClass({
	render: function() {
		return(
            <div className="imageBox">
            	<img className="predictionImg" src="/assets/img/ainsley.png" />
            </div>
			);

	}
});

module.exports = ErrorBox;