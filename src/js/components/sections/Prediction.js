var React 			  		 = require("react/addons");
var ReactCSSTransitionGroup  = React.addons.CSSTransitionGroup;

var PredictionActionCreators = require("../../actions/PredictionActionCreators");


var Prediction = React.createClass({

	render: function(){
		console.log('data in Prediction: ', this.props.data);

		return (
			<PredictionBox data={this.props.data} active={this.props.active}/>
			);
	}

});



var PredictionBox = React.createClass({
    render: function() {
      	console.log('data in PredictionBox: ', this.props.data);
        return(
            <div className="predictionBox">
                <TextBox data={this.props.data} active={this.props.active}/>
                <ImageBox data={this.props.data} />
                <MenuBox />
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
           {this.props.data[this.props.active].text}
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


var MenuBox = React.createClass({

	create: function(){
		
		var route = {
			submission  : true,
			prediction  : false
		};

		PredictionActionCreators.navigateTo(route);

	},

	render: function(){
		return (
			<div className="menuBox">
				<input type="submit" value="Profile" className="menu_button" />
				<input type="submit" value="Create" className="menu_button"  onClick={this.create}/>
				<input type="submit" value="Friends" className="menu_button" />
			</div>
			);
	}
})






module.exports = Prediction;