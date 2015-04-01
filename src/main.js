var React = require("react");

React.initializeTouchEvents(true);

var DATA = [{url: 'http://dummyimage.com/300', text: 'Will this couple break up this week 1?'}];

var MainBox = React.createClass({ 

    componentDidMount: function(){
        this.setState({
            data: DATA[0]
        });
    },
    render: function() {
        return(
        <div className="mainBox">
            Predict the News
            <button  />     
            <PredictionBox data={this.props.data} />
            <MenuBox />
        </div>
        );
    }
});


var PredictionBox = React.createClass({

    render: function() {
        return(
            <div className="predictionBox">
                <TextBox text={this.props.data.text}/>
                <ImageBox url={this.props.data.url} />
                
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
                {this.props.text}
            </div>
            );
    }
});


var ImageBox = React.createClass({

    handleTouchMove: function(e){
        lastX = e.touches[0].pageX;
        this.props.lastX = lastX;

    },

    handleTouchStart: function(e){
        console.log('touch start');
        firstX = e.touches[0].pageX;
        this.props.firstX = firstX;
    },

    onTouchEnd: function(e){
        if(this.props.firstX - this.props.lastX > 75) {
            console.log("swipe left");
        } else if (this.props.firstX - this.props.lastX < -75) {
            console.log("swipe right")
        }
    },
    render: function() {
        return(
            <div className="imageBox" className="predictionImg" >
                <img src={this.props.url} onTouchMove={this.handleTouchMove} onTouchEnd={this.onTouchEnd} onTouchStart={this.handleTouchStart} />
                <span className="yes" >Yes</span>
                <span className="No" >No</span>
            </div>
            );
    }
});




React.render(
    <MainBox data={DATA[0]} />,
    document.getElementById("content")
    );
