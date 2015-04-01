var React = require("react");

var Topics = React.createClass({
    render: function() {
        return (
            <div className={"sectionHolder " + this.props.topic} id="Topics">
                <div className="sectionHeader">
                    <h1>Topics</h1>
                </div>
                <div className="sectionBody">
                    <div className="section sectionSingle">
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Topics;