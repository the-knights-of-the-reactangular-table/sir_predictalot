var React 			  		 = require("react/addons");
var ReactCSSTransitionGroup  = React.addons.CSSTransitionGroup;
var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var Prediction = React.createClass({

	render: function(){
		return (
			<PredictionBox prediction={this.props.prediction} />
			);
	}

});



var PredictionBox = React.createClass({

    render: function() {
        return(
            <div className="predictionBox">
                <TextBox text={this.props.prediction.text} />
                <ImageBox url={this.props.prediction.url} />
                <MenuBox topic={this.props.prediction.topic} username={this.props.user.username} />
            </div>
        );
    }

});



var TextBox = React.createClass({

    render: function() {
	    return(
	        <div className="textBox">
	       		{this.props.text}
	        </div>
	    );
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
        var option;

        if(firstX - lastX > 75) {
            didSwipe = true;
            swipe = 'swipe-left';
            option = "option2";
        } else if (firstX - lastX < -75) {
            didSwipe = true;
            swipe = 'swipe-right';
        	option = "option1";
        }


        var swipeInfo = {
        	id: image.id,
        	username: this.props.username,
			topic: image.topic,
			option: option,
			type: swipe
		};

		if(didSwipe){
			PredictionActionCreators.newSwipe(swipeInfo);
		}

    },


    render: function() {
	        var yes_style;
	        var no_style;

	        if (this.props.left){
	            no_style = {
	                opacity: 1
	            };
	        }
	        if (this.props.right){
	            yes_style = {
	                opacity: 1
	            };
	        }

        return(
            <div className="imageBox" >
	            <ReactCSSTransitionGroup transitionName="swipe">
		            <div key={this.props.url + this.props.text}>
		                <div  className={this.props.animation_class}
		                      onTouchMove={this.handleTouchMove}
		                      onTouchEnd={this.onTouchEnd}
		                      onTouchStart={this.handleTouchStart}
		                >
		                <div style={yes_style} className='yes_stamp'>Yes</div>
		                <div style={no_style} className='no_stamp'>No</div>
		                <img className="predictionImg" src={this.props.url} /></div>
		            </div>
	            </ReactCSSTransitionGroup>
            </div>
        );
    }
});


var MenuBox = React.createClass({

	clickHandler: function(){

		var route = "submission";
		PredictionActionCreators.navigateTo(route);

	},

	deleteHandler: function() {
		PredictionActionCreators.deleteTopic(this.props.topic);
	},

	render: function(){
		return (
			<div className="menuBox">
				<button className="button delete_button" onClick={this.deleteHandler} />
				<button className="button add_button"  onClick={this.clickHandler}/>
			</div>
		);
	}
});



module.exports = Prediction;
