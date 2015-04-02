var React = require("react/addons");
//var addons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
React.initializeTouchEvents(true);


var DATA = [
            {url: 'img/ronaldo_square.jpg', text: "Will Real Madrid win Champions League 2015?", key: 4, animation_class: ""},
            {url: 'img/sterling_square.jpg', text: 'Will he leave Liverpool this summer?', key: 3, animation_class: ""},
            {url: 'img/manu_square.jpg', text: "Will ManU get the 2. place in PL?", key: 2, animation_class: ""},
            {url: 'img/boxing_square.jpg', text: 'Will Mayweather beat Pacquiao?', key: 1, animation_class: ""}
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
<<<<<<< HEAD
                <ImageBox data={this.props.data}
                            onTouchEnd={this.props.onTouchEnd}
                            handleTouchStart={this.props.handleTouchStart}
                            handleTouchMove={this.props.handleTouchMove}/>
=======
                <ImageBox   data={this.props.data}
                            onTouchEnd={this.props.onTouchEnd}
                            handleTouchStart={this.props.handleTouchStart}
                            handleTouchMove={this.props.handleTouchMove}/>
>>>>>>> 18e0213a6de292115570e63be2506e5e89bdc7ef
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
<<<<<<< HEAD
                    <div key={that.props.data.key}
                        className={image.animation_class}
                        onTouchMove={that.props.handleTouchMove}
                        onTouchEnd={that.props.onTouchEnd.bind(null,image)}
                        onTouchStart={that.props.handleTouchStart}>
=======
                    <div key={that.props.data.key}
                        className={image.animation_class}
                        onTouchMove={that.props.handleTouchMove}
                        onTouchEnd={that.props.onTouchEnd.bind(null,image)}
                        onTouchStart={that.props.handleTouchStart}>
                    <div className="yes_stamp">Yes</div>
                    <div className="no_stamp">No</div>

>>>>>>> 18e0213a6de292115570e63be2506e5e89bdc7ef
                    <img className="predictionImg" src={image.url} /></div>
                </div>
            );
        });


        return(
            <div className="imageBox" >
            <ReactCSSTransitionGroup transitionName="swipe">
<<<<<<< HEAD

                {images}
=======
                {images}
>>>>>>> 18e0213a6de292115570e63be2506e5e89bdc7ef
            </ReactCSSTransitionGroup>

            </div>
        );
    }
});




React.render(
    <MainBox data={DATA} />,
    document.getElementById("content")
    );
