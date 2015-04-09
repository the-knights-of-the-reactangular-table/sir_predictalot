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
var swipe;

var ImageBox = React.createClass({

    render: function() { 
    	var key = Math.floor(Math.random()*10000);
     return(
            <ReactTransitionGroup transitionName="swipe">
	           <SingleImage key={key} image={this.props.prediction} />
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

        if(firstX - lastX > 50) {
            didSwipe = true;
            swipe = 'swipe-left';
        } else if (firstX - lastX < -50) {
            didSwipe = true;
            swipe = 'swipe-right';
        }

        var swipeInfo = {
        	image: image,
			direction: swipe,
			topic: 'football'
		};

		console.log('on touch end triggered');

		if (didSwipe){
			PredictionActionCreators.newSwipe(swipeInfo);
		}

    },

	componentWillLeave: function(done){
		var animated_element = this.getDOMNode();
		animated_element.className = swipe;
		var children = animated_element.childNodes;
		console.log('children; ',children);


		if (swipe === 'swipe-left'){
			children[1].style["opacity"] = 1;
		} else if (swipe === 'swipe-right'){
			children[0].style["opacity"] = 1;
		}


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
			)
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
