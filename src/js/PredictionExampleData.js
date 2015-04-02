module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(
    	{
			"user": {
				"username": "MIJOTHY",
				"email": "james.gandhi.2332@googlemail.com",
				"stats": {
					"points": 30000,
					"boxing":{"name": "boxing", "points": 10000, "predictions": 0, "challenges": 0},
					"football": {"name": "football", "points": 20000, "predictions": 0, "challenges": 0}
				},
				"preferences": {
					"home": "boxing",
					"currentSelection": "boxing",
					"events": ["boxing", "football"],
					"sections": ["predictions"]
				}
			},
			"events" : {
				"boxing": {
					"name": "Boxer 1 vs Boxer 2",
					"participants": ["boxer1", "boxer2"],
					"predictions": [
						{"type": ["binary", "method"], "name": "Victor", "option1": ["JASON"], "option2": ["TIMOTHY"], "pointForCorrect": 10000},
						{"type": ["binary"], "name": "Most knockdowns", "option1": ["WHIMMY"], "option2": ["TIMOTHY"], "pointForCorrect": 15000},
						{"type": ["binary", "percentage", "bar"], "name": "Punches landed", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointForCorrect": 20000},
						{"type": ["unary", "percentage", "bar", "challenge"], "name": "Landed punches", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointForCorrect": 40000}
					],
					"challenges": [
						{"type": ["binary", "method"],"name": "Guess the weigh-in","option1": [],"option2": [],"pointForCorrect": 30000},
					]
				},
				"football": {
					"name": "Team 1 vs Team 2",
					"participants": ["team1", "team2"],
					"predictions": [
						{"type": ["binary", "method"], "name": "Victor", "option1": ["JASON"], "option2": ["TIMOTHY"], "pointForCorrect": 10000},
						{"type": ["binary"], "name": "Most knockdowns", "option1": ["WHIMMY"], "option2": ["TIMOTHY"], "pointForCorrect": 15000},
						{"type": ["binary", "percentage", "bar"], "name": "Punches landed", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointForCorrect": 20000},
						{"type": ["unary", "percentage", "bar", "challenge"], "name": "Landed punch %"}
					],
					"challenges": [
						{"type": ["unary", "method"],"name": "Number of yellow cards","option1": [],"option2": [],"pointForCorrect": 20000},
					]
				},
				"esports": {
					"name": "Gamer 1 vs Gamer 2",
					"participants": ["gamer1", "gamer2"],
					"predictions": [
						{"type": ["binary", "method"], "name": "Victor", "option1": ["JASON"], "option2": ["TIMOTHY"], "pointForCorrect": 10000},
						{"type": ["binary"], "name": "Most knockdowns", "option1": ["WHIMMY"], "option2": ["TIMOTHY"], "pointForCorrect": 15000},
						{"type": ["binary", "percentage", "bar"], "name": "Punches landed", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointForCorrect": 20000},
						{"type": ["unary", "percentage", "bar", "challenge"], "name": "Landed punch %"}
					]
				},
			}
    	}
	    ));
	}

};