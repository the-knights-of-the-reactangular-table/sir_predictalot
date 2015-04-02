var React = require("react/addons");
//var addons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
React.initializeTouchEvents(true);

var DATA = [{url: 'img/zlatan.jpg', text: 'Will PSG win Champions League?', key: 1, animation_class: ""},
            {url: 'http://lorempixel.com/g/400/400/people', text: "Will he win Eurovision 2015?", key: 2, animation_class: ""},
            {url: 'http://lorempixel.com/g/400/400/people', text: 'Will they break up?', key: 3, animation_class: ""}
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
        var swipe = "";
        if(this.props.firstX - this.props.lastX > 75) {
            console.log("swipe left");
            swipe = 'swipe-left';
        } else if (this.props.firstX - this.props.lastX < -75) {
            console.log("swipe right");
            swipe = 'swipe-right';
        }


        console.log('image = ', image);
        var newData = this.state.data;
        // newData.animation_class = "swipe-left";
        image_number = this.state.data.indexOf(image);
        newData[image_number].animation_class = swipe;
        console.log('image_number: ', image_number);
        console.log('newData: ', newData);
        //newData.splice(image_number, 1);
        new_active = image_number - 1;
        console.log('new_active_text: ', new_active);

        this.setState({ 
            data : newData,
            active : new_active 
        });


    },


    getInitialState: function(){
        return  {
            data: DATA,
            active: 2
        }
    },


    render: function() {
        return(
        <div className="mainBox">
            <PredictionBox  active={this.state.active} 
                            data={this.props.data} 
                            onTouchEnd={this.onTouchEnd} 
                            handleTouchStart={this.handleTouchStart} 
                            handleTouchMove={this.handleTouchMove}/>
            <MenuBox />
        </div>
        );
    }
});


var PredictionBox = React.createClass({
    render: function() {
        return(
            <div className="predictionBox">
                <TextBox data={this.props.data} active={this.props.active}/>
                <ImageBox data={this.props.data} 
                            onTouchEnd={this.props.onTouchEnd} 
                            handleTouchStart={this.props.handleTouchStart} 
                            handleTouchMove={this.props.handleTouchMove}/>         
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
        console.log('checkin if else')
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


var ImageBox = React.createClass({

    render: function() {
        var that = this;
        var images = this.props.data.map(function(image, i){
           return (
                <div>
                    <div key={that.props.data.key} 
                        className={image.animation_class} 
                        onTouchMove={that.props.handleTouchMove} 
                        onTouchEnd={that.props.onTouchEnd.bind(null,image)} 
                        onTouchStart={that.props.handleTouchStart}> 
                    <img className="predictionImg" src={image.url} /></div>
                </div>
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
