var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
    method: "GET",
    path: "/",
    handler: function(request, reply) {
        reply.file(__dirname + "/index.html");
    },
});

server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: "build"
        }
    },
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});

