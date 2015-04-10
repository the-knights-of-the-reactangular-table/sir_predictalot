var React 			  		 = require("react/addons");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");
var ImageBox 				 = require("./ImageBox");
var SpinBox 				 = require("./SpinBox");
var MenuBox 				 = require("./MenuBox");
var ErrorBox 				 = require("./ErrorBox");
var TextBox 				 = require("./TextBox");

var Prediction = React.createClass({

    render: function() {
    	var mainBox;
        var prediction = this.props.prediction;

    	if(prediction) {
    		mainBox = <ImageBox prediction={prediction} username={this.props.username} />;
    	} else {
    		mainBox = <ErrorBox />;
    	}
        return(
            <div className="predictionBox">
                <TextBox text={prediction && prediction.text || "No predictions remaining! Wait a while or try making your own"} />
                {mainBox}
                <MenuBox topic={prediction && prediction.topic || null} username={this.props.username} />
            </div>
        );
    }

});

module.exports = Prediction;
