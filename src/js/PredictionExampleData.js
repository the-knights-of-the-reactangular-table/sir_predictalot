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
					"currentSelection": "boxing",
					"events": ["boxing", "football", "esports"],
					"sections": []
				}
			},
			"events" : {
				"boxing": {
					"name": "Boxer 1 vs Boxer 2",
					"participants": ["boxer1", "boxer2"],
					"predictions": [
						{"type": ["binary", "method"], "name": "Victor", "option1": ["JASON"], "option2": ["TIMOTHY"], "pointsForCorrect": 10000},
						{"type": ["binary"], "name": "Most knockdowns", "option1": ["WHIMMY"], "option2": ["TIMOTHY"], "pointsForCorrect": 15000},
						{"type": ["binary", "percentage", "bar"], "name": "Punches landed", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointsForCorrect": 20000},
						{"type": ["unary", "percentage", "bar", "challenge"], "name": "Landed punches", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointsForCorrect": 40000}
					],
					"challenges": [
						{"type": ["binary", "method"],"name": "Guess the weigh-in","option1": [],"option2": [],"pointsForCorrect": 30000},
					]
				},
				"football": {
					"name": "Team 1 vs Team 2",
					"participants": ["team1", "team2"],
					"predictions": [
						{"type": ["binary", "method"], "name": "Hector", "option1": ["JASON"], "option2": ["TIMOTHY"], "pointsForCorrect": 10000},
						{"type": ["binary"], "name": "Most knockdowns", "option1": ["WHIMMY"], "option2": ["TIMOTHY"], "pointsForCorrect": 15000},
						{"type": ["binary", "percentage", "bar"], "name": "Punches landed", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointsForCorrect": 20000},
						{"type": ["unary", "percentage", "bar", "challenge"], "name": "Landed punch %"}
					],
					"challenges": [
						{"type": ["unary", "method"],"name": "Number of yellow cards","option1": [],"option2": [],"pointsForCorrect": 20000},
					]
				},
				"esports": {
					"name": "Gamer 1 vs Gamer 2",
					"participants": ["gamer1", "gamer2"],
					"predictions": [
						{"type": ["binary", "method"], "name": "Tractor", "option1": ["JASON"], "option2": ["TIMOTHY"], "pointsForCorrect": 10000},
						{"type": ["binary"], "name": "Most knockdowns", "option1": ["WHIMMY"], "option2": ["TIMOTHY"], "pointsForCorrect": 15000},
						{"type": ["binary", "percentage", "bar"], "name": "Punches landed", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointsForCorrect": 20000},
						{"type": ["unary", "percentage", "bar", "challenge"], "name": "Landed punch %"}
					]
				},
				"m8s": {
					"name": "Your m8s predictions",
					"participants": ["all your friends"],
					"predictions": [
					],
					"challenges": [
					],
				}
			}
    	}
	    ));
	}

};