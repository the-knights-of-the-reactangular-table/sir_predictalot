var React 			  		 = require("react/addons");
var ReactCSSTransitionGroup  = React.addons.CSSTransitionGroup;
var PredictionActionCreators = require("../../actions/PredictionActionCreators");
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
        return(
            <div className="predictionBox">
                <TextBox text={this.props.prediction.text} />
                <ImageBox username={this.props.username} prediction={this.props.prediction} />
                <MenuBox />
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
    	console.log('image.target: ', image.target);
    	console.log('on touch end');
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
        	option = "option2";
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
		console.log('this.getDOMENode() ', this.getDOMNode());
		var animated_element = this.getDOMNode();
		animated_element.className = swipe;
    	console.log('component will leave triggered');
    	console.log('Swipe is :', swipe);
    	setTimeout(function(){
	    	done();
    	},1000);
    },

    componentDidLeave: function(){
    	console.log('component did leave triggered');
    	console.log('Swipe is :', swipe);

    },

    componentWillUnmount: function(){
    	console.log('componentWillUnmount triggered');
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


var MenuBox = React.createClass({

	clickHandler: function(){

		var route = "submission";
		PredictionActionCreators.navigateTo(route);

	},

	render: function(){
		return (
			<div className="menuBox">
				<button className="menu_button"  onClick={this.clickHandler}/>
			</div>
		);
	}
});



module.exports = Prediction;
