var React = require("react/addons");
//var addons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
React.initializeTouchEvents(true);

var DATA = [{url: 'http://lorempixel.com/g/400/400/sports', text: 'Will this couple break up this week 1?', key: 1, animation_class: "hello1"},
            {url: 'http://lorempixel.com/g/400/400/food', text: 'Will this couple break up this week 1?', key: 2, animation_class: "hello2"},
            {url: 'http://lorempixel.com/g/400/400/fashion', text: 'Will this couple break up this week 1?', key: 3, animation_class: "hello3"}
];

var MainBox = React.createClass({ 

    handleTouchMove: function(e){
        lastX = e.touches[0].pageX;
        this.props.lastX = lastX;

    },

    handleTouchStart: function(e){
        console.log('touch start');
        firstX = e.touches[0].pageX;
        this.props.firstX = firstX;
    },

    onTouchEnd: function(image){
        
        if(this.props.firstX - this.props.lastX > 75) {
            console.log("swipe left");
        } else if (this.props.firstX - this.props.lastX < -75) {
            console.log("swipe right");
        }


        console.log('image = ', image);
        var newData = this.state.data;
       // newData.animation_class = "swipe-left";
        image_number = this.state.data.indexOf(image);
        console.log('image_number: ', image_number);
        console.log('newData: ', newData)
        newData.splice(image_number, 1);
        
        this.setState(
            {data:newData}
        );

    },

    getInitialState: function(){
        return  {
            data: DATA
        }
    },




    render: function() {
        return(
        <div className="mainBox">
            Predict the News
            <button  />     
            <PredictionBox data={this.props.data} onTouchEnd={this.onTouchEnd} handleTouchStart={this.handleTouchStart} handleTouchMove={this.handleTouchMove}/>
            <MenuBox />
        </div>
        );
    }
});


var PredictionBox = React.createClass({
    render: function() {
        return(
            <div className="predictionBox">
                <TextBox data={this.props.data}/>
                <ImageBox data={this.props.data}  onTouchEnd={this.props.onTouchEnd} handleTouchStart={this.props.handleTouchStart} handleTouchMove={this.props.handleTouchMove}/>         
            </div>
        );
    }
});


var MenuBox = React.createClass({
    render: function() {
        return(
            <div className="menuBox">
                My Profile - More info - Settings
            </div>
            );
    }
});


var TextBox = React.createClass({
    render: function() {
        return(
            <div className="textBox">
                {this.props.data.text}
            </div>
            );
    }
});


var ImageBox = React.createClass({

    render: function() {
        var that = this;
        var images = this.props.data.map(function(image, i){
           return (
                <div key={that.props.data.key} className={image.animation_class} onTouchMove={that.props.handleTouchMove} onTouchEnd={that.props.onTouchEnd.bind(null,image)} onTouchStart={that.props.handleTouchStart} ><img className="predictionImg"  src={image.url}  /> </div>
            );
        });
       
        return(
            <div className="imageBox" >
            <ReactCSSTransitionGroup transitionName="swipe">
                {images}  
            </ReactCSSTransitionGroup>

            </div>
        );
    }
});




React.render(
    <MainBox data={DATA} />,
    document.getElementById("content")
    );
