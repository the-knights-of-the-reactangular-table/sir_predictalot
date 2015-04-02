var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: "GET",
    path: "/",
    handler: function(request, reply) {
        reply.file("/Users/rorysedgwick/Projects/fac4/week10/sir_predictalot/index.html");
    },
});

server.route({
    method: "GET",
    path: "/build/main.js",
    handler: function(request, reply) {
        reply.file("/Users/rorysedgwick/Projects/fac4/week10/sir_predictalot/build/main.js");
    },
});

server.route({
    method: "GET",
    path: "/build/index.css",
    handler: function(request, reply) {
        reply.file("/Users/rorysedgwick/Projects/fac4/week10/sir_predictalot/build/index.css");
    },
});

// server.route({
//     method: "GET",
//     path: "/{param}",
//     handler: {
//         directory: {
//             path: "/Users/rorysedgwick/Projects/fac4/week10/sir_predictalot/build/"
//         }
//     },
// });

server.start(function() {
    console.log('Server running at:', server.info.uri);
});

