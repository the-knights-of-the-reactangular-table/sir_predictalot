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
var swipe;

var ImageBox = React.createClass({

    render: function() {
    	var key = Math.floor(Math.random()*10000);
     return(
            <ReactTransitionGroup transitionName="swipe">
	           <SingleImage key={key} image={this.props.prediction} username={this.props.username} />
		    </ReactTransitionGroup>
        );
    }
});



var SingleImage = React.createClass({

	handleTouchMove: function(e){
        lastX = e.touches[0].pageX;
	},

	handleTouchStart: function(e){
        firstX = e.touches[0].pageX;
    },

    onTouchEnd: function(image){
        var didSwipe = false;
        var option;

        if(firstX - lastX > 50) {
            didSwipe = true;
            swipe = 'swipe-left';
        	option = "option1";
        } else if (firstX - lastX < -50) {
            didSwipe = true;
            swipe = 'swipe-right';
            option = "option2";
        }

        var swipeInfo = {
        	username: this.props.username,
        	id : this.props.image.id,
			topic: this.props.image.topic,
			option: option,
			direction: swipe
		};

		if (didSwipe){
			PredictionActionCreators.newSwipe(swipeInfo);
		}
    },

	componentWillLeave: function(done){
		var animated_element = this.getDOMNode();
        console.log(animated_element);
		animated_element.className = swipe;
		var children = animated_element.childNodes;


		if (swipe === 'swipe-left'){
			children[1].style.opacity = 1;
		} else if (swipe === 'swipe-right'){
			children[0].style.opacity = 1;
		}

    	setTimeout(function(){
	    	done();
    	},1000);
    },

    componentDidLeave: function(){

    },

    componentWillUnmount: function(){
    },

	render: function(){
		return(
            <div  className={this.props.image.animation_class}
	              onTouchMove={this.handleTouchMove}
	              onTouchEnd={this.onTouchEnd.bind(null,this.props.image)}
	              onTouchStart={this.handleTouchStart}
	             >
	            <div className='yes_stamp'>Yes</div>
	            <div className='no_stamp'>No</div>
	            <img className="predictionImg" src={this.props.image.url} />
            </div>
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
