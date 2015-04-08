var React 					= require("react");
var PredictionAPIUtils 		= require("./utils/PredictionAPIUtils");
var PredictionApp 			= require("./components/PredictionApp");

function initialRender() {
	React.render(
		<PredictionApp />, document.getElementById("content")
	);
}

PredictionAPIUtils.getAllData(initialRender);