const betsReducer = (state, action) => {
	console.log("in bets reducer", action);
	switch (action.type) {
		case "ADD BET":
			if (action.recipient) {
				state.pendingBets.recipientBets = [...state.pendingBets.recipientBets, action.bets];
			} else {
				state.pendingBets.openBets = [...state.pendingBets.openBets, action.bets];
			}
			return state;
		case "ACCEPTED BET":
			if (action.recipient) {
				state.pendingBets.recipientBets = state.pendingBets.recipientBets.filter(
					(bet) => bet.id !== action.bets.id
				);
			} else {
				state.pendingBets.openBets = state.pendingBets.openBets.filter((bet) => bet.id !== action.bets.id);
			}
			state.acceptedBets = [...state.acceptedBets, action.bets];
			return state;
		case "COMPLETED BET":
			state.acceptedBets = state.acceptedBets.filter((bet) => bet.id !== action.bets.id);
			state.completedBets = [...state.completedBets, action.bets];
			return state;
		case "INIT":
			return { ...action.bets, blockchain: action.blockchain };
		case "GAME UPDATE":
			let sportWithBets = [];
			const nflBets = action.bets.pendingBets.openBets
				.filter((bet) => bet.details.displayName === "NFL")
				.sort((a, b) => {
					new Date(a.details.date) - new Date(b.details.date);
				});
			const mlbBets = action.bets.pendingBets.openBets
				.filter((bet) => bet.details.displayName === "MLB")
				.sort((a, b) => {
					return new Date(a.details.date) - new Date(b.details.date);
				});
			const nbaBets = action.bets.pendingBets.openBets
				.filter((bet) => bet.details.displayName === "NBA")
				.sort((a, b) => {
					return new Date(a.details.date) - new Date(b.details.date);
				});
			const ncaabBets = action.bets.pendingBets.openBets
				.filter((bet) => bet.details.displayName === "NCAA Men's Basketball")
				.sort((a, b) => {
					return new Date(a.details.date) - new Date(b.details.date);
				});
			const nhlBets = action.bets.pendingBets.openBets
				.filter((bet) => bet.details.displayName === "NHL")
				.sort((a, b) => {
					return new Date(a.details.date) - new Date(b.details.date);
				});
			const wnbaBets = action.bets.pendingBets.openBets
				.filter((bet) => bet.details.displayName === "WNBA")
				.sort((a, b) => {
					return new Date(a.details.date) - new Date(b.details.date);
				});

			if (nflBets.length > 0) sportWithBets.push({ displayName: "NFL", icon: 2, bets: nflBets });
			if (mlbBets.length > 0) sportWithBets.push({ displayName: "MLB", icon: 3, bets: mlbBets });
			if (nbaBets.length > 0) sportWithBets.push({ displayName: "NBA", icon: 4, bets: nbaBets });
			if (ncaabBets.length > 0)
				sportWithBets.push({ displayName: "NCAA Men's Basketball", icon: 5, bets: ncaabBets });
			if (nhlBets.length > 0) sportWithBets.push({ displayName: "NHL", icon: 6, bets: nhlBets });
			if (wnbaBets.length > 0) sportWithBets.push({ displayName: "WNBA", icon: 8, bets: wnbaBets });
			return sportWithBets
				.map((sport) => {
					const bet = sport.bets.map((bet) => {
						const sportGames = action.sportsData.find((item) => item.display_name === sport.displayName);
						const event = sportGames.data.events?.find((event) => event.id === bet.details.id);
						bet.event = event;
						return bet;
					});
					return bet;
				})
				.flat();

		default:
			return state;
	}
};

export default betsReducer;
