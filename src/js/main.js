var React 					= require("react");
var PredictionExampleData 	= require("./PredictionExampleData");
var PredictionAPIUtils 		= require("./utils/PredictionAPIUtils");
var PredictionApp 			= require("./components/PredictionApp");

PredictionExampleData.init();
PredictionAPIUtils.getAllData();

React.render(
	<PredictionApp />, document.getElementById("content")
	);