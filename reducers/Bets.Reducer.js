const betsReducer = (state, action) => {
	const gamesAddedtoBets = (bets, games) => {
		return bets.map((sport) => {
			const bet = sport.bets.map((bet) => {
				const sportGames = games.find((item) => item.display_name === sport.displayName);
				const event = sportGames.data.events?.find((event) => event.id === bet.details.id);
				bet.event = event;
				if (event?.status.type.state === "post") {
					bet.openStatus = "Ended";
				} else if (event?.status.type.state === "in") {
					bet.openStatus = event.status.period <= 1 ? "danger" : "Closed";
				} else if (event?.status.type.state === "pre") {
					const now = new Date();
					const gameTime = new Date(bet.event.date);
					const timeDiff = (gameTime.getTime() - now.getTime()) / (3600 * 1000);
					if (gameTime.getDate() === now.getDate() && gameTime.getMonth() === now.getMonth()) {
						bet.openStatus = timeDiff <= 2 ? "warning" : "info";
					}
				}
				return bet;
			});
			return { ...sport, bets: bet };
		});
	};

	switch (action.type) {
		case "ADD BET":
			const sportIcons = [
				{ displayName: "NFL", icon: 2, bets: [] },
				{ displayName: "MLB", icon: 3, bets: [] },
				{ displayName: "NBA", icon: 4, bets: [] },
				{ displayName: "NCAA Men's Basketball", icon: 5, bets: [] },
				{ displayName: "NHL", icon: 6, bets: [] },
				{ displayName: "WNBA", icon: 8, bets: [] },
			];
			if (action.recipient) {
				const index = state.pendingBets.recipientBets.findIndex(
					(sport) => sport.displayName === action.bet.details.displayName
				);
				if (index === -1) {
					return {
						...state,
						pendingBets: {
							openBets: state.pendingBets.openBets,
							recipientBets: [
								...state.pendingBets.recipientBets,
								{
									...sportIcons.find((sport) => sport.displayName === action.bet.details.displayName),
									bets: [action.bet],
								},
							],
						},
					};
				} else {
					return {
						...state,
						pendingBets: {
							openBets: state.pendingBets.openBets,
							recipientBets: state.pendingBets.recipientBets.map((sport) =>
								sport.displayName === action.bet.details.displayName
									? { ...sport, bets: [...sport.bets, action.bet] }
									: sport
							),
						},
					};
				}
			} else {
				const index = state.pendingBets.openBets.findIndex(
					(sport) => sport.displayName === action.bet.details.displayName
				);
				if (index === -1) {
					return {
						...state,
						pendingBets: {
							openBets: [
								...state.pendingBets.openBets,
								{
									...sportIcons.find((sport) => sport.displayName === action.bet.details.displayName),
									bets: [action.bet],
								},
							],
							recipientBets: state.pendingBets.recipientBets,
						},
					};
				} else {
					return {
						...state,
						pendingBets: {
							openBets: state.pendingBets.openBets.map((sport) =>
								sport.displayName === action.bet.details.displayName
									? { ...sport, bets: [...sport.bets, action.bet] }
									: sport
							),
							recipientBets: state.pendingBets.recipientBets,
						},
					};
				}
			}

		case "ACCEPTED BET":
			return {
				...state,
				pendingBets: {
					openBets: state.pendingBets.openBets.map((sport) =>
						sport.displayName === action.bet.details.displayName
							? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bet.id) }
							: sport
					),
					recipientBets: state.pendingBets.recipientBets.map((sport) =>
						sport.displayName === action.bet.details.displayName
							? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bet.id) }
							: sport
					),
				},
				acceptedBets: state.acceptedBets.map((sport) =>
					sport.displayName === action.bet.details.displayName
						? { ...sport, bets: [...sport.bets, action.bet] }
						: sport
				),
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

		case "REMOVE BETS":
			return {
				...state,
				completedBets: [],
			};

		case "INIT":
			return {
				pendingBets: {
					openBets: action.bets.pendingBets.openBets,
					recipientBets: action.bets.pendingBets.recipientBets,
				},
				acceptedBets: action.bets.acceptedBets,
				completedBets: action.bets.completedBets,
				initialized: action.initialized,
			};

		case "GAME UPDATE":
			return {
				...state,
				pendingBets: {
					openBets: gamesAddedtoBets(state.pendingBets.openBets, action.games),
					recipientBets: gamesAddedtoBets(state.pendingBets.recipientBets, action.games),
				},
				acceptedBets: gamesAddedtoBets(state.acceptedBets, action.games),
			};

		case "INIT2":
			return {
				pendingBets: {
					openBets: gamesAddedtoBets(action.bets.pendingBets.openBets, action.games),
					recipientBets: gamesAddedtoBets(action.bets.pendingBets.recipientBets, action.games),
				},
				acceptedBets: gamesAddedtoBets(action.bets.acceptedBets, action.games),
				completedBets: action.bets.completedBets,
				initialized: action.initialized,
			};

		// default:
		// 	return state;
	}
};

export default betsReducer;
