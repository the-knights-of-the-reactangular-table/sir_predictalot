var Server = require("./api/server");

Server.start(function() {
	console.log("Server running at " + Server.info.uri);
});