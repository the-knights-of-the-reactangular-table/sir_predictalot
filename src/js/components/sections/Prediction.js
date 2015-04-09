var React 			  		 = require("react/addons");
var ReactCSSTransitionGroup  = React.addons.CSSTransitionGroup;
var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var Prediction = React.createClass({

	render: function(){
		return (
			<PredictionBox predictions={this.props.predictions} />
			);
	}

});



var PredictionBox = React.createClass({

    render: function() {
        return(
            <div className="predictionBox">
                <TextBox predictions={this.props.predictions} />
                <ImageBox predictions={this.props.predictions} />
                <MenuBox />
            </div>
        );
    }

});



var TextBox = React.createClass({

    render: function() {
	    return(
	        <div className="textBox">
	       		{this.props.predictions[this.props.predictions.length - 1].text}
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
        	option = "option2";
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
	        var images = this.props.predictions.map(function(image, i){
	        var yes_style;
	        var no_style;

	        if (image.left){
	            no_style = {
	                opacity: 1
	            };
	        }
	        if (image.right){
	            yes_style = {
	                opacity: 1
	            };
	        }

	        return (
	                <div key={image.url + image.text}>
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


var MenuBox = React.createClass({

	clickHandler: function(){

		var route = "submission";
		PredictionActionCreators.navigateTo(route);

	},

	render: function(){
		return (
			<div className="menuBox">
				<input type="submit" value="Profile" className="menu_button" />
				<input type="submit" value="Create" className="menu_button"  onClick={this.clickHandler}/>
				<input type="submit" value="Friends" className="menu_button" />
			</div>
		);
	}
});



module.exports = Prediction;
