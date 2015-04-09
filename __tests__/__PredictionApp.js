jest.dontMock("../src/components/PredictionApp.js");

describe("CommentBox", function(){

	var React       	= require("react/addons");
    var PredictionApp  	= require("../src/components/PredictionApp.js");
    var TestUtils   	= React.addons.TestUtils;

    it("should render onto the page", function() {
    	var app = TestUtils.renderIntoDocument(
            <PredictionApp/>
        );
    });
});