const gamesAddedtoBets = (bets, games) => {
	return bets.map((sport) => {
		const bet = sport.bets.map((bet) => {
			const sportGames = games.find((item) => item.display_name === sport.displayName);
			const event = sportGames.data.events?.find((event) => event.id === bet.details.gameId);
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

const betsReducer = (state, action) => {
	const sportIcons = [
		{
			icon: 1,
			abbrv: "NCAAF",
			sport: "football",
			displayName: "NCAA Football",
			league_name: "college-football",
			bets: [],
		},
		{
			icon: 2,
			abbrv: "NFL",
			sport: "football",
			displayName: "NFL",
			league_name: "nfl",
			bets: [],
		},
		{
			icon: 3,
			abbrv: "MLB",
			sport: "baseball",
			displayName: "MLB",
			league_name: "mlb",
			bets: [],
		},
		{
			icon: 4,
			abbrv: "NBA",
			sport: "basketball",
			displayName: "NBA",
			league_name: "nba",
			bets: [],
		},
		{
			icon: 5,
			abbrv: "NCAAB",
			sport: "basketball",
			displayName: "NCAA Men's Basketball",
			league_name: "mens-college-basketball",
			bets: [],
		},
		{
			icon: 6,
			abbrv: "NHL",
			sport: "hockey",
			displayName: "NHL",
			league_name: "nhl",
			bets: [],
		},
		{
			icon: 8,
			abbrv: "WNBA",
			sport: "basketball",
			displayName: "WNBA",
			league_name: "wnba",
			bets: [],
		},
		{
			icon: 10,
			abbrv: "MLS",
			sport: "soccer",
			displayName: "MLS",
			league_name: "mls",
			bets: [],
		},
	];

	switch (action.type) {
		case "ADD BET":
			if (action.recipient) {
				const index = state.pendingBets.recipientBets.findIndex(
					(sport) => sport.displayName === action.bet.details.sport
				);
				if (index === -1) {
					return {
						...state,
						pendingBets: {
							openBets: state.pendingBets.openBets,
							recipientBets: [
								...state.pendingBets.recipientBets,
								{
									...sportIcons.find((sport) => sport.displayName === action.bet.details.sport),
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
								sport.displayName === action.bet.details.sport
									? { ...sport, bets: [...sport.bets, action.bet] }
									: sport
							),
						},
					};
				}
			} else {
				const index = state.pendingBets.openBets.findIndex(
					(sport) => sport.displayName === action.bet.details.sport
				);
				if (index === -1) {
					return {
						...state,
						pendingBets: {
							openBets: [
								...state.pendingBets.openBets,
								{
									...sportIcons.find((sport) => sport.displayName === action.bet.details.sport),
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
								sport.displayName === action.bet.details.sport
									? { ...sport, bets: [...sport.bets, action.bet] }
									: sport
							),
							recipientBets: state.pendingBets.recipientBets,
						},
					};
				}
			}

		case "ACCEPTED BET":
			const index = state.acceptedBets.findIndex((sport) => sport.displayName === action.bet.details.sport);
			if (index === -1) {
				return {
					...state,
					pendingBets: {
						openBets: state.pendingBets.openBets.map((sport) =>
							sport.displayName === action.bet.details.sport
								? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bet.id) }
								: sport
						),
						recipientBets: state.pendingBets.recipientBets.map((sport) =>
							sport.displayName === action.bet.details.sport
								? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bet.id) }
								: sport
						),
					},
					acceptedBets: [
						...state.acceptedBets,
						{
							...sportIcons.find((sport) => sport.displayName === action.bet.details.sport),
							bets: [action.bet],
						},
					],
				};
			} else {
				return {
					...state,
					pendingBets: {
						openBets: state.pendingBets.openBets.map((sport) =>
							sport.displayName === action.bet.details.sport
								? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bet.id) }
								: sport
						),
						recipientBets: state.pendingBets.recipientBets.map((sport) =>
							sport.displayName === action.bet.details.sport
								? { ...sport, bets: sport.bets.filter((bet) => bet.id !== action.bet.id) }
								: sport
						),
					},
					acceptedBets: state.acceptedBets.map((sport) =>
						sport.displayName === action.bet.details.sport
							? { ...sport, bets: [...sport.bets, action.bet] }
							: sport
					),
				};
			}

		case "COMPLETED OPEN BET":
			return {
				...state,
				pendingBets: {
					openBets: state.pendingBets.openBets.map((sport) => {
						return {
							...sport,
							bets: sport.bets.filter((bet) => {
								return bet.event.status.type.name !== "STATUS_FINAL";
							}),
						};
					}),
					recipientBets: state.pendingBets.recipientBets,
				},
				completedBets: [...state.completedBets, ...action.bets],
			};

		case "COMPLETED RECIPIENT BET":
			return {
				...state,
				pendingBets: {
					openBets: state.pendingBets.openBets,
					recipientBets: state.pendingBets.recipientBets((sport) => {
						return {
							...sport,
							bets: sport.bets.filter((bet) => {
								return bet.event.status.type.name !== "STATUS_FINAL";
							}),
						};
					}),
				},
				completedBets: [...state.completedBets, ...action.bets],
			};

		case "COMPLETED ACCEPTED BET":
			return {
				...state,
				acceptedBets: state.acceptedBets.map((sport) => {
					return {
						...sport,
						bets: sport.bets.filter((bet) => {
							return bet.event.status.type.name !== "STATUS_FINAL";
						}),
					};
				}),
				completedBets: [...state.completedBets, ...action.bets],
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
				userBets: action.userBets,
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
	}
};

export default betsReducer;
