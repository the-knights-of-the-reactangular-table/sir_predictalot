var React 			  		 = require("react/addons");
var PredictionActionCreators = require("../../actions/PredictionActionCreators");
var SpinBox 				 = require("./SpinBox");

var ReactTransitionGroup  = React.addons.TransitionGroup;


var Prediction = React.createClass({

	render: function(){
		return (
			<PredictionBox prediction={this.props.prediction} username={this.props.username} />
			);
	}

});



var PredictionBox = React.createClass({

    render: function() {
    	var mainbox;
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
        	id: this.props.prediction.id,
        	username: this.props.username,
			topic: this.props.prediction.topic,
			option: option,
			type: swipe
		};

		if(didSwipe){
			PredictionActionCreators.newSwipe(swipeInfo);
		}

    },

    componentWillLeave: function(done){
		var animated_element = this.getDOMNode();
		animated_element.className = swipe;
    	setTimeout(function(){
	    	done();
    	},1000);
    },

    componentDidLeave: function(){

    },

    componentWillUnmount: function(){
    },

    render: function() {
     return(

            <ReactTransitionGroup transitionName="swipe">
            <div className="imageBox">
               <div key={this.props.prediction.url}>
	                    <div className={this.props.prediction.animation_class}
		                      onTouchMove={this.handleTouchMove}
	                          onTouchEnd={this.onTouchEnd}
	                          onTouchStart={this.handleTouchStart}
	                    >
	                    <div  className='yes_stamp'>Yes</div>
	                    <div  className='no_stamp'>No</div>
	                    <img className="predictionImg" src={this.props.prediction.url} /></div>
	            </div>
            </div>
            </ReactTransitionGroup>

        );
    }
});

var ErrorBox = React.createClass({
	render: function() {
		return(
            <div className="imageBox">
            	<img className="predictionImg" src="/assets/img/ainsley.png" />
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
		var deleteMe = {
			topic: this.props.topic,
			username: this.props.username
		};
		if (this.props.topic) {
			PredictionActionCreators.removeTopic(deleteMe);
		}
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
