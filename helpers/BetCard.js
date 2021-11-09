const capitalize = ([firstLetter, ...restOfWord]) => firstLetter.toUpperCase() + restOfWord.join("");
function homeAwayHelper(game) {
	let homeTeam = game.competitions[0].competitors.filter((team) => {
		return team.homeAway === "home";
	});
	let awayTeam = game.competitions[0].competitors.filter((team) => {
		return team.homeAway === "away";
	});
	return { homeTeam, awayTeam };
}
function oddsHelper(outcomes, teamPick) {
	let vigProbability;
	let odd = outcomes.find((outcome) => outcome.name.includes(teamPick.team.shortDisplayName));
	if (odd.price < 0) {
		vigProbability = (-1 * odd.price) / (-1 * odd.price + 100);
	} else if (odd.price > 0) {
		vigProbability = 100 / (odd.price + 100);
	}
	return { ...odd, vigProbability };
}
function marketHelper(market, away, home) {
	let awayOdds = oddsHelper(market.outcomes, away);
	let homeOdds = oddsHelper(market.outcomes, home);
	const totalProb = awayOdds.vigProbability + homeOdds.vigProbability;
	awayOdds.winProbability = awayOdds.vigProbability / totalProb;
	homeOdds.winProbability = homeOdds.vigProbability / totalProb;
	return {
		key: market.key,
		away: awayOdds,
		home: homeOdds,
	};
}

export function BetGameData(bet) {
	const spreadPercentages = {
		nfl: {
			0: { favorite: 0.5, underdog: 0.5 },
			0.5: { favorite: 0.5, underdog: 0.5 },
			1: { favorite: 0.513, underdog: 0.488 },
			1.5: { favorite: 0.525, underdog: 0.475 },
			2: { favorite: 0.535, underdog: 0.465 },
			2.5: { favorite: 0.545, underdog: 0.455 },
			3: { favorite: 0.594, underdog: 0.406 },
			3.5: { favorite: 0.643, underdog: 0.357 },
			4: { favorite: 0.658, underdog: 0.342 },
			4.5: { favorite: 0.673, underdog: 0.327 },
			5: { favorite: 0.681, underdog: 0.319 },
			5.5: { favorite: 0.69, underdog: 0.311 },
			6: { favorite: 0.707, underdog: 0.294 },
			6.5: { favorite: 0.724, underdog: 0.277 },
			7: { favorite: 0.752, underdog: 0.248 },
			7.5: { favorite: 0.781, underdog: 0.219 },
			8: { favorite: 0.791, underdog: 0.209 },
			8.5: { favorite: 0.802, underdog: 0.198 },
			9: { favorite: 0.807, underdog: 0.193 },
			9.5: { favorite: 0.811, underdog: 0.189 },
			10: { favorite: 0.836, underdog: 0.164 },
			10.5: { favorite: 0.86, underdog: 0.14 },
			11: { favorite: 0.871, underdog: 0.129 },
			11.5: { favorite: 0.882, underdog: 0.118 },
			12: { favorite: 0.885, underdog: 0.116 },
			12.5: { favorite: 0.887, underdog: 0.113 },
			13: { favorite: 0.893, underdog: 0.107 },
			13.5: { favorite: 0.9, underdog: 0.1 },
			14: { favorite: 0.924, underdog: 0.076 },
			14.5: { favorite: 0.949, underdog: 0.051 },
			15: { favorite: 0.956, underdog: 0.044 },
			15.5: { favorite: 0.963, underdog: 0.037 },
			16: { favorite: 0.981, underdog: 0.019 },
			16.5: { favorite: 0.998, underdog: 0.002 },
			17: { favorite: 0.999, underdog: 0.001 },
		},
		ncaaf: {
			0: { favorite: 0.5, underdog: 0.5 },
			0.5: { favorite: 0.5, underdog: 0.5 },
			1: { favorite: 0.512, underdog: 0.488 },
			1.5: { favorite: 0.525, underdog: 0.475 },
			2: { favorite: 0.534, underdog: 0.466 },
			2.5: { favorite: 0.543, underdog: 0.458 },
			3: { favorite: 0.574, underdog: 0.426 },
			3.5: { favorite: 0.606, underdog: 0.394 },
			4: { favorite: 0.619, underdog: 0.381 },
			4.5: { favorite: 0.631, underdog: 0.369 },
			5: { favorite: 0.641, underdog: 0.359 },
			5.5: { favorite: 0.651, underdog: 0.349 },
			6: { favorite: 0.664, underdog: 0.336 },
			6.5: { favorite: 0.677, underdog: 0.323 },
			7: { favorite: 0.703, underdog: 0.297 },
			7.5: { favorite: 0.73, underdog: 0.27 },
			8: { favorite: 0.738, underdog: 0.262 },
			8.5: { favorite: 0.746, underdog: 0.254 },
			9: { favorite: 0.751, underdog: 0.25 },
			9.5: { favorite: 0.755, underdog: 0.245 },
			10: { favorite: 0.774, underdog: 0.226 },
			10.5: { favorite: 0.793, underdog: 0.208 },
			11: { favorite: 0.799, underdog: 0.201 },
			11.5: { favorite: 0.806, underdog: 0.194 },
			12: { favorite: 0.816, underdog: 0.184 },
			12.5: { favorite: 0.826, underdog: 0.174 },
			13: { favorite: 0.83, underdog: 0.17 },
			13.5: { favorite: 0.835, underdog: 0.165 },
			14: { favorite: 0.851, underdog: 0.149 },
			14.5: { favorite: 0.868, underdog: 0.132 },
			15: { favorite: 0.874, underdog: 0.126 },
			15.5: { favorite: 0.881, underdog: 0.12 },
			16: { favorite: 0.886, underdog: 0.115 },
			16.5: { favorite: 0.891, underdog: 0.11 },
			17: { favorite: 0.914, underdog: 0.086 },
			17.5: { favorite: 0.937, underdog: 0.063 },
			18: { favorite: 0.95, underdog: 0.051 },
			18.5: { favorite: 0.962, underdog: 0.038 },
			19: { favorite: 0.973, underdog: 0.027 },
			19.5: { favorite: 0.984, underdog: 0.016 },
			20: { favorite: 0.999, underdog: 0.001 },
		},
		nba: {
			0: { favorite: 0.5, underdog: 0.5 },
			0.5: { favorite: 0.5, underdog: 0.5 },
			1: { favorite: 0.511, underdog: 0.489 },
			1.5: { favorite: 0.523, underdog: 0.477 },
			2: { favorite: 0.543, underdog: 0.457 },
			2.5: { favorite: 0.563, underdog: 0.437 },
			3: { favorite: 0.582, underdog: 0.418 },
			3.5: { favorite: 0.601, underdog: 0.399 },
			4: { favorite: 0.619, underdog: 0.381 },
			4.5: { favorite: 0.636, underdog: 0.364 },
			5: { favorite: 0.658, underdog: 0.342 },
			5.5: { favorite: 0.68, underdog: 0.32 },
			6: { favorite: 0.701, underdog: 0.299 },
			6.5: { favorite: 0.721, underdog: 0.279 },
			7: { favorite: 0.742, underdog: 0.258 },
			7.5: { favorite: 0.763, underdog: 0.238 },
			8: { favorite: 0.784, underdog: 0.217 },
			8.5: { favorite: 0.805, underdog: 0.196 },
			9: { favorite: 0.828, underdog: 0.172 },
			9.5: { favorite: 0.852, underdog: 0.148 },
			10: { favorite: 0.873, underdog: 0.127 },
			10.5: { favorite: 0.894, underdog: 0.106 },
			11: { favorite: 0.913, underdog: 0.087 },
			11.5: { favorite: 0.932, underdog: 0.068 },
			12: { favorite: 0.95, underdog: 0.05 },
			12.5: { favorite: 0.968, underdog: 0.032 },
			13: { favorite: 0.987, underdog: 0.013 },
			13.5: { favorite: 0.999, underdog: 0.001 },
		},
		ncaab: {
			0: { favorite: 0.5, underdog: 0.5 },
			0.5: { favorite: 0.5, underdog: 0.5 },
			1: { favorite: 0.517, underdog: 0.483 },
			1.5: { favorite: 0.535, underdog: 0.465 },
			2: { favorite: 0.554, underdog: 0.446 },
			2.5: { favorite: 0.574, underdog: 0.426 },
			3: { favorite: 0.597, underdog: 0.403 },
			3.5: { favorite: 0.621, underdog: 0.38 },
			4: { favorite: 0.641, underdog: 0.359 },
			4.5: { favorite: 0.662, underdog: 0.338 },
			5: { favorite: 0.682, underdog: 0.318 },
			5.5: { favorite: 0.702, underdog: 0.298 },
			6: { favorite: 0.72, underdog: 0.281 },
			6.5: { favorite: 0.737, underdog: 0.263 },
			7: { favorite: 0.758, underdog: 0.243 },
			7.5: { favorite: 0.778, underdog: 0.222 },
			8: { favorite: 0.798, underdog: 0.203 },
			8.5: { favorite: 0.817, underdog: 0.183 },
			9: { favorite: 0.838, underdog: 0.162 },
			9.5: { favorite: 0.859, underdog: 0.141 },
			10: { favorite: 0.881, underdog: 0.119 },
			10.5: { favorite: 0.903, underdog: 0.097 },
			11: { favorite: 0.924, underdog: 0.076 },
			11.5: { favorite: 0.945, underdog: 0.055 },
			12: { favorite: 0.967, underdog: 0.033 },
			12.5: { favorite: 0.989, underdog: 0.011 },
			13: { favorite: 0.999, underdog: 0.001 },
		},
	};
	const { homeTeam, awayTeam } = homeAwayHelper(bet.event);
	let homeRecords, homeAvgProb, awayRecords, awayAvgProb;
	let temp = [
		{ name: "Home", type: "home", summary: 0 },
		{ name: "Away", type: "away", summary: 0 },
	];
	let bookmakers = bet.odds?.bookmakers.map((odd) => {
		return {
			key: odd.key,
			title: odd.title,
			market: marketHelper(odd.markets[0], awayTeam[0], homeTeam[0]),
		};
	});

	if (!bookmakers) {
		bookmakers = bet.event.competitions[0].odds?.map((odd) => {
			let away = { name: awayTeam[0].displayName, winProbability: 0 };
			let home = { name: homeTeam[0].displayName, winProbability: 0 };
			if (odd.awayTeamOdds) {
				if (odd.awayTeamOdds.winPercentage) {
					away.winProbability = odd.awayTeamOdds.winPercentage * 0.01;
					home.winProbability = odd.homeTeamOdds.winPercentage * 0.01;
				} else if (odd.awayTeamOdds.moneyLine) {
					if (odd.awayTeamOdds.moneyLine < 0) {
						away.winProbability = (-1 * odd.awayTeamOdds.moneyLine) / (-1 * odd.awayTeamOdds.moneyLine + 100);
					} else if (odd.awayTeamOdds.moneyLine > 0) {
						away.winProbability = 100 / (odd.awayTeamOdds.moneyLine + 100);
					}
					if (odd.homeTeamOdds.moneyLine < 0) {
						home.winProbability = (-1 * odd.homeTeamOdds.moneyLine) / (-1 * odd.homeTeamOdds.moneyLine + 100);
					} else if (odd.homeTeamOdds.moneyLine > 0) {
						home.winProbability = 100 / (odd.homeTeamOdds.moneyLine + 100);
					}
				}
			} else {
				let [favoriteTeam, favoriteValue] = odd.details.split(" ");
				let favoritePercentage, underdogPercentage;
				if (Math.abs(favoriteValue) > 100) {
					if (favoriteValue < 0) {
						favoritePercentage = (-1 * favoriteValue) / (-1 * favoriteValue + 100);
					} else if (favoriteValue > 0) {
						favoritePercentage = 100 / (favoriteValue + 100);
					}
					underdogPercentage = 1 - favoritePercentage;
				}
				if (favoriteTeam === awayTeam[0].team.abbreviation) {
					if (favoritePercentage && underdogPercentage) {
						away.winProbability = favoritePercentage;
						home.winProbability = underdogPercentage;
					} else {
						if (bet.details.sport === "NCAA Football") {
							if (Math.abs(favoriteValue) >= 20) {
								away.winProbability = spreadPercentages.ncaaf[20].favorite;
								home.winProbability = spreadPercentages.ncaaf[20].underdog;
							} else {
								away.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].favorite;
								home.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].underdog;
							}
						} else if (bet.details.sport === "NFL") {
							if (Math.abs(favoriteValue) >= 17) {
								away.winProbability = spreadPercentages.nfl[17].favorite;
								home.winProbability = spreadPercentages.nfl[17].underdog;
							} else {
								away.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].favorite;
								home.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].underdog;
							}
						} else if (bet.details.sport === "NBA") {
							if (Math.abs(favoriteValue) >= 13.5) {
								away.winProbability = spreadPercentages.nba[13.5].favorite;
								home.winProbability = spreadPercentages.nba[13.5].underdog;
							} else {
								away.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].favorite;
								home.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].underdog;
							}
						} else if (bet.details.sport === "NCAA Men's Basketball") {
							if (Math.abs(favoriteValue) >= 13) {
								away.winProbability = spreadPercentages.ncaab[13].favorite;
								home.winProbability = spreadPercentages.ncaab[13].underdog;
							} else {
								away.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].favorite;
								home.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].underdog;
							}
						}
					}
				} else {
					if (favoritePercentage && underdogPercentage) {
						home.winProbability = favoritePercentage;
						away.winProbability = underdogPercentage;
					} else {
						if (bet.details.sport === "NCAA Football") {
							if (Math.abs(favoriteValue) >= 20) {
								home.winProbability = spreadPercentages.ncaaf[20].favorite;
								away.winProbability = spreadPercentages.ncaaf[20].underdog;
							} else {
								home.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].favorite;
								away.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].underdog;
							}
						} else if (bet.details.sport === "NFL") {
							if (Math.abs(favoriteValue) >= 17) {
								home.winProbability = spreadPercentages.nfl[17].favorite;
								away.winProbability = spreadPercentages.nfl[17].underdog;
							} else {
								home.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].favorite;
								away.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].underdog;
							}
						} else if (bet.details.sport === "NBA") {
							if (Math.abs(favoriteValue) >= 13.5) {
								home.winProbability = spreadPercentages.nba[13.5].favorite;
								away.winProbability = spreadPercentages.nba[13.5].underdog;
							} else {
								home.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].favorite;
								away.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].underdog;
							}
						} else if (bet.details.sport === "NCAA Men's Basketball") {
							if (Math.abs(favoriteValue) >= 13) {
								home.winProbability = spreadPercentages.ncaab[13].favorite;
								away.winProbability = spreadPercentages.ncaab[13].underdog;
							} else {
								home.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].favorite;
								away.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].underdog;
							}
						}
					}
				}
			}
			return { key: odd.provider.name, title: odd.provider.name, market: { away, home } };
		});
	}
	if (bookmakers) {
		awayAvgProb = (
			(bookmakers.reduce((total, bookmaker, index, array) => {
				return (total += bookmaker.market.away.winProbability);
			}, 0) /
				bookmakers.length) *
			100
		).toFixed(1);
		homeAvgProb = (
			(bookmakers.reduce((total, bookmaker, index, array) => {
				return (total += bookmaker.market.home.winProbability);
			}, 0) /
				bookmakers.length) *
			100
		).toFixed(1);
	}

	if (!bet.event.competitions[0].competitors[0].records) {
		homeRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
		awayRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
	} else if (bet.event.competitions[0].competitors[0].records.length > 1) {
		homeRecords = homeTeam[0].records;
		awayRecords = awayTeam[0].records;
	} else {
		homeRecords = [...homeTeam[0].records, ...temp];
		awayRecords = [...awayTeam[0].records, ...temp];
	}

	return {
		id: bet.id,
		amount: bet.amount,
		date: bet.details.date,
		sportName: bet.details.sport,
		status: bet.event.status,
		shortDetail: bet.event.competitions[0].status.type.shortDetail,
		detail: bet.event.competitions[0].status.type.detail,
		odds: bookmakers,
		openStatus: bet.openStatus,
		away: {
			abbreviation: awayTeam[0].team.abbreviation,
			alternateColor: `#${awayTeam[0].team.alternateColor}`,
			color: `#${awayTeam[0].team.color}`,
			logo: awayTeam[0].team.logo,
			name: awayTeam[0].team.shortDisplayName,
			records: awayRecords,
			score: parseInt(awayTeam[0].score),
			homeAway: capitalize(awayTeam[0].homeAway),
			requesterTeam: awayTeam[0].team.shortDisplayName === bet.details.winner ? true : false,
			winProb: awayAvgProb,
		},
		home: {
			abbreviation: homeTeam[0].team.abbreviation,
			alternateColor: `#${homeTeam[0].team.alternateColor}`,
			color: `#${homeTeam[0].team.color}`,
			logo: homeTeam[0].team.logo,
			name: homeTeam[0].team.shortDisplayName,
			records: homeRecords,
			score: parseInt(homeTeam[0].score),
			homeAway: capitalize(homeTeam[0].homeAway),
			requesterTeam: homeTeam[0].team.shortDisplayName === bet.details.winner ? true : false,
			winProb: homeAvgProb,
		},
		venue: bet.event.competitions[0].venue,
	};
}
