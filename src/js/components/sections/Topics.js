var React = require("react");

var Topics = React.createClass({
	//Just changes the look... and it's not changing database yet
	getInitialState: function() {
		return {selected: true}
	},
	clickHandler: function(e) {
		this.setState({selected: !this.state.selected});
		//this.props.onSelection(e.target.value, "selection");
	},
	render: function() {
		var e = [this.props.event.events[0]];
		var topic = this.state.selected ? 'Showing: ' + [e] : 'Hiding: ' + [e];
		return (
			<div className={"sectionHolder " + this.props.topic} id="Topics">
				<div className="sectionHeader">
					<h1>Topics</h1>
				</div>
				<div className="sectionBody">
					<div className="section sectionSingle">
						<ul onClick={this.clickHandler}> {topic}
						</ul>
						<ul>{this.props.event.events[1]}
						</ul>
						<ul>{this.props.event.events[2]}
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Topics;