Jest.AutoMockOff();

var Shot   = require("shot");
var server = require("../server.js");

describe("The /{param*} route", function() {

	it("should return index.html if we don't specify a parameter name", function() {

		var options = {
			url: "/",
			method: "GET"
		};

		Shot.inject(server, options, function(err, res) {
			expect(res.statusCode).toBe(200);
			expect(res.headers["Content-Type"]).toContain("html");
			expect(res.payload).toBeDefined();
		});
	});

	it("should return a file with the {param} name from the public folder", function() {

		var options = {
			url: "/assets/css/main.css",
			method: "GET"
		};

		Shot.inject(server, options, function(err, res) {
			expect(res.statusCode).toBe(200);
			expect(res.payload).toBeDefined();
		});

	});

	it("should return an error if the requested file doesn't exist", function() {

		var options = {
			url: "/nonexistantfile",
			method: "GET"
		};

		Shot.inject(server, options, function(err, res) {
			expect(res.statusCode).toBe(404);
		});

	});
});

describe("the /login route", function() {

	it("should return an error if the username sent doesn't match a user", function() {

		var options = {
			url: "/login",
			method: "POST",
			payload: {
				username: "nonexistantuser"
			}
		};

		Shot.inject(server, options, function(err, res) {
			expect(res.statusCode).toBe(404);
			expect(res.payload).toInclude("doesn't exist");
		});
	});

	it("should return ok if the username sent matches a user", function() {

		var options = {
			url: "/login",
			method: "POST",
			payload: {
				username: "PHB"
			}
		};

		Shot.inject(server, options, function(err, res) {
			expect(res.statusCode).toBe(200);
			expect(res.headers["Content-Type"]).toInclude("json");
			expect(res.payload.user).toBeDefined();
		});
	});

	it("should return a batch of predictions if the user has any in their preferences", function() {

		var options = {
			url: "/login",
			method: "POST",
			payload: {
				username: "PHB"
			}
		};

		Shot.inject(server, options, function(err, res) {
			expect(res.payload.predictions).toBeDefined();
			expect(res.payload.predictions.length).toBeGreaterThan(1);
		});
	});
});