var http = require("http");
var port = 4000;
var fs = require('fs');

var server = http.createServer(function (req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(fs.readFileSync('index.html'));
});

server.listen(port);

console.log('Server running on port ', port);