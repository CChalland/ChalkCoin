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
			// if (action.recipient) {
			// 	return {
			// 		...state,
			// 		pendingBets: {
			// 			openBets: state.pendingBets.openBets,
			// 			recipientBets: state.pendingBets.recipientBets.map((sport) =>
			// 				sport.displayName === action.bets.details.displayName
			// 					? { ...sport, bets: [...sport.bets, action.bets] }
			// 					: sport
			// 			),
			// 		},
			// 	};
			// } else {
			// 	return {
			// 		...state,
			// 		pendingBets: {
			// 			openBets: state.pendingBets.openBets.map((sport) =>
			// 				sport.displayName === action.bets.details.displayName
			// 					? { ...sport, bets: [...sport.bets, action.bets] }
			// 					: sport
			// 			),
			// 			recipientBets: state.pendingBets.recipientBets,
			// 		},
			// 	};
			// }
			return {
				...state,
				pendingBets: {
					openBets: action.recipient
						? state.pendingBets.openBets
						: state.pendingBets.openBets.map((sport) =>
								sport.displayName === action.bets.details.displayName
									? { ...sport, bets: [...sport.bets, action.bets] }
									: sport
						  ),
					recipientBets: action.recipient
						? state.pendingBets.recipientBets.map((sport) =>
								sport.displayName === action.bets.details.displayName
									? { ...sport, bets: [...sport.bets, action.bets] }
									: sport
						  )
						: state.pendingBets.recipientBets,
				},
			};

		case "ACCEPTED BET":
			return {
				...state,
				pendingBets: {
					openBets: state.pendingBets.openBets.map((sport) =>
						sport.displayName === action.bets.details.displayName
							? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bets.id) }
							: sport
					),
					recipientBets: state.pendingBets.recipientBets.map((sport) =>
						sport.displayName === action.bets.details.displayName
							? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bets.id) }
							: sport
					),
				},
				acceptedBets: [...state.acceptedBets, action.bets],
			};

		case "COMPLETED BET":
			return {
				...state,
				acceptedBets: state.acceptedBets.map((sport) => {
					return {
						...sport,
						bets: sport.bets.filter((bet) => !action.bets.some((actBet) => actBet.id === bet.id)),
					};
				}),
				completedBets: [...state.completedBets, ...action.bets],
			};
			2;

		case "INIT":
			return {
				pendingBets: {
					openBets: gamesAddedtoBets(action.bets.pendingBets.openBets, action.games),
					recipientBets: gamesAddedtoBets(action.bets.pendingBets.recipientBets, action.games),
				},
				acceptedBets: gamesAddedtoBets(action.bets.acceptedBets, action.games),
				completedBets: action.bets.completedBets,
				initialized: action.initialized,
			};

		// case "GAME UPDATE":
		// 	return state;

		// default:
		// 	return state;
	}
};

export default betsReducer;
