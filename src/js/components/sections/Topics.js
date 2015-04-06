var React = require("react");

var Topics = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		this.props.onSelection(e.target.value);
	},
	render: function() {
		return (
			<div className={"sectionHolder " + this.props.topic} id="Topics">
				<div className="sectionHeader">
					<h1>Topics</h1>
				</div>
				<div className="sectionBody">
					<div className="section sectionSingle">
						<ul>
							<div>
								<button value={this.props.event.events[0]} onClick={this.handleClick}>{this.props.event.events[0]}</button>
							</div>
						</ul>
						<ul>
							<div>
								<button value={this.props.event.events[1]} onClick={this.handleClick}>{this.props.event.events[1]}</button>
							</div>
						</ul>
						<ul>
							<div>
								<button value={this.props.event.events[2]} onClick={this.handleClick}>{this.props.event.events[2]}</button>
							</div>
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Topics;