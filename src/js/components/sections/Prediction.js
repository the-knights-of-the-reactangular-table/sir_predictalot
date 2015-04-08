var React 			  		 = require("react/addons");
var ReactCSSTransitionGroup  = React.addons.CSSTransitionGroup;

var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var Prediction = React.createClass({

	render: function(){
		console.log('data in Prediction: ', this.props.data);

		return (
			<PredictionBox data={this.props.data} />
			);
	}

});



var PredictionBox = React.createClass({
    render: function() {
      	console.log('data in PredictionBox: ', this.props.data);
        return(
            <div className="predictionBox">
                <TextBox />
                <ImageBox data={this.props.data} />
            </div>
        );
    }
});



var TextBox = React.createClass({
    render: function() {
        if (this.props.active < 0) {
            return(
                <div className="textBox">
                    Load more stories...
                </div>
            );
        } else {

        return(
            <div className="textBox">
            	Stories from FLUX
            </div>
            );
        }
    }
});


var lastX;
var firstX;

var ImageBox = React.createClass({

	handleTouchMove: function(e){
        lastX = e.touches[0].pageX;
	},

	handleTouchStart: function(e){
        firstX = e.touches[0].pageX;
    },

  	
    onTouchEnd: function(image){
        var didSwipe = false;
        var swipe = "";

        if(firstX - lastX > 75) {
            didSwipe = true;
            swipe = 'swipe-left';
        } else if (firstX - lastX < -75) {
            didSwipe = true;
            swipe = 'swipe-right';
        }


        var swipeInfo = {
        	image: image,
			type: swipe,
			topic: 'football'
		};


		PredictionActionCreators.newSwipe(swipeInfo);




	
/*
        newData[image_number].animation_class = swipe;
        new_active = image_number - 1;

        var newStateObj = {};
        newStateObj.data = newData;
        newStateObj.active = new_active;

        if (didSwipe){
            newStateObj.swipe = {};
            newStateObj.swipe.left = "";
            newStateObj.swipe.right = "";
        }

        this.setState(newStateObj);

*/
    },


    render: function() {
    		console.log('data in ImageBox: ', this.props.data);
	        var images = this.props.data.map(function(image, i){
	        if (image.left){
	            var no_style = {
	                opacity: 1
	            };
	        }
	        if (image.right){
	            var yes_style = {
	                opacity: 1
	            };
	        }
	           
	        return (
	                <div key={this.props.data.key}>
	                    <div  className={image.animation_class}
		                      onTouchMove={this.handleTouchMove}
	                          onTouchEnd={this.onTouchEnd.bind(null,image)}
	                          onTouchStart={this.handleTouchStart}
	                    >
	                    <div style={yes_style} className='yes_stamp'>Yes</div>
	                    <div style={no_style} className='no_stamp'>No</div>
	                    <img className="predictionImg" src={image.url} /></div>
	                </div>
	            );
	        }.bind(this));

        return(
            <div className="imageBox" >
            <ReactCSSTransitionGroup transitionName="swipe">
                {images}
            </ReactCSSTransitionGroup>
            </div>
        );
    }
});




/*

	clickHandler: function(e) {
		e.preventDefault();
		var predictionInfo = {
			type: "predictions",
			topic: this.props.currentEventName,
			pred_id: this.props.predictionId,
			chosen: e.target.value
		};
		PredictionActionCreators.newPrediction(predictionInfo);
	},

	


	render: function() {
		var prediction = this.props.prediction;
		var predictionBody = (function(){

			switch (prediction.type[0]) {

				case "binary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h3>{prediction.name}</h3>
								<h5>{prediction.pointsForCorrect}</h5>
							</div>
							<div className="sectionBinary sectionLeft">
								<h3>HardCodedBoxer1</h3>
								<button value="option1" onClick={this.clickHandler}>1</button>
							</div>
							<div className="sectionBinary sectionRight">
								<h3>HardCodedBoxer2</h3>
								<button value="option2" onClick={this.clickHandler}>2</button>
							</div>
						</div>
						);

				case "unary":
					return (
						<div className="sectionBody">
							<div className="topicName">
								<h3>{prediction.name}</h3>
								<h5>{prediction.pointsForCorrect}</h5>
							</div>
							<div className="sectionUnary">HardCodedBoxer1</div>
						</div>
					);

				}
			}.bind(this)());

		return (
			<div className={"sectionHolder " + this.props.currentEventName} id="Predictions">
				<div className="sectionHeader">
					<h1>Prediction</h1>
				</div>
				{predictionBody}
			</div>
		);
	}

*/



module.exports = Prediction;