module.exports = {
	"UserStore": {
		"MIJOTHY": {
			"username": "MIJOTHY",
			"email": "james.gandhi.2332@googlemail.com",
			"points": 30000,
			"selectedEvent": "boxing",
			"topics": {
				"boxing":{"name": "boxing", "points": 10000, "topic": 0},
				"football": {"name": "football", "points": 20000, "topic": 0}
			}
		},
		"TIMOTHY": {
			"username": "TIMOTHY",
			"email": "timmy.gandhi.2332@googlemail.com",
			"points": 15000,
			"selectedEvent": "boxing",
			"topics": {
				"boxing":{"name": "boxing", "points": 5000, "topic": 0},
				"football":{"name": "football", "points": 10000, "topic": 0}
			}
		},
		"SKIMOTHY": {
			"username": "SKIMOTHY",
			"email": "terry.gandhi.2332@googlemail.com",
			"points": 37500,
			"selectedEvent": "boxing",
			"topics": {
				"boxing":{"name": "boxing", "points": 7500, "topic": 0},
				"football":{"name": "football", "points": 30000, "topic": 0}
			}
		},
		"WHIMOTHY": {
			"username": "WHIMOTHY",
			"email": "tony.gandhi.2332@googlemail.com",
			"points": 42000,
			"selectedEvent": "boxing",
			"topics": {
				"boxing":{"name": "boxing", "points": 2000, "topic": 0},
				"football":{"name": "football", "points": 40000, "topic": 0}
			}
		},
		"JASON": {
			"username": "JASON",
			"email": "jason.gandhi.2332@googlemail.com",
			"points": 39001,
			"selectedEvent": "boxing",
			"topics": {
				"boxing":{"name": "boxing", "points": 7001, "topic": 0},
				"football":{"name": "football", "points": 30000, "topic": 0},
				"esports": {"name": "esports", "points": 2001, "topic": 0}
			}
		},
	},
	"EventStore" : {
		"events": ["boxing", "football", "esports"],
		"boxing": {
			"name": "Boxer 1 vs Boxer 2",
			"participants": ["boxer1", "boxer2"],
			"predictionTopics": [
				{"type": ["binary", "method"], "name": "Who will win?", "option1": ["JASON"], "option2": ["TIMOTHY"], "pointForCorrect": 10000},
				{"type": ["binary"], "name": "Most knockdowns", "option1": ["WHIMMY"], "option2": ["TIMOTHY"], "pointForCorrect": 15000},
				{"type": ["binary", "percentage", "bar"], "name": "Punches landed", "option1": ["MIJOTHY"], "option2": ["TIMOTHY"], "pointForCorrect": 20000},
				{"type": ["unary", "percentage", "bar", "challenge"], "name": "Landed punch %?"}
			],
			"challenges": [
			]
		}
	}
};