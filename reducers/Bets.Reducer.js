const betsReducer = (state, action) => {
	const gamesAddedtoBets = (bets, games) => {
		return bets.map((sport) => {
			const bet = sport.bets.map((bet) => {
				const sportGames = games.find((item) => item.display_name === sport.displayName);
				const event = sportGames.data.events?.find((event) => event.id === bet.details.id);
				bet.event = event;
				return bet;
			});
			return { ...sport, bets: bet };
		});
	};

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
			return {
				pendingBets: {
					openBets: gamesAddedtoBets(action.bets.pendingBets.openBets, action.games),
					recipientBets: gamesAddedtoBets(action.bets.pendingBets.recipientBets, action.games),
				},
				acceptedBets: gamesAddedtoBets(action.bets.acceptedBets, action.games),
				completedBets: gamesAddedtoBets(action.bets.completedBets, action.games),
				initialized: action.initialized,
			};

		// case "GAME UPDATE":
		// 	return state;

		// default:
		// 	return state;
	}
};

export default betsReducer;
