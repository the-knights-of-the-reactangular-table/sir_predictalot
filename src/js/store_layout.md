# Main Stores
UserStore 	--> Stores the current user info
EventStore  --> Stores all event info

## Dependent Stores

UnfinishedEventStore --> Stores the user's uncompleted event info
	NEEDS: user prefs + event list
	[Wait for UserStore && EventStore]

LeaderboardStore --> Stores leaderboard info
