var fs = require("fs");

module.exports = {

	getAllData: function(callback) {
		fs.readFile("./dummydata.json", function(err, contents) {});
	}
};