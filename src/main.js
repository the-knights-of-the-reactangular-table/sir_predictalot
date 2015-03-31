var React = require("react");

var MainBox = React.createClass({
    render: function() {
        return(
        <div className="mainBox">
            Mainbox
            <PredictionBox />
            <MenuBox />
        </div>
        );
    }
});


var PredictionBox = React.createClass({
    render: function() {
        return(
            <div className="predictionBox">
                PredictionBox
                <ImageBox />
                <TextBox />
            </div>
        );
    }
});


var MenuBox = React.createClass({
    render: function() {
        return(
            <div className="menuBox">
                MenuBox
            </div>
            );
    }
});


var TextBox = React.createClass({
    render: function() {
        return(
            <div className="textBox">
                TextBox
            </div>
            );
    }
});


var ImageBox= React.createClass({
    render: function() {
        return(
            <div className="imageBox">
                ImageBox
            </div>
            );
    }
});




React.render(
    <MainBox />,
    document.getElementById("content")
    );
