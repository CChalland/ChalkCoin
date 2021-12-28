function homeAwayHelper(game) {
	let homeTeam = game.competitions[0].competitors.filter((team) => {
		return team.homeAway === "home";
	});
	let awayTeam = game.competitions[0].competitors.filter((team) => {
		return team.homeAway === "away";
	});
	return { homeTeam, awayTeam };
}

export function GameScoreHelper(game, sportName) {
	const { homeTeam, awayTeam } = homeAwayHelper(game);
	let homePeriods, awayPeriods, homeRecords, awayRecords;
	let temp = [
		{ name: "Home", type: "home", summary: 0 },
		{ name: "Away", type: "away", summary: 0 },
	];

	if (sportName === "MLB") {
		let runs, hits, errors;
		runs = awayTeam[0].statistics.filter((stat) => {
			return stat.name === "runs";
		});
		hits = awayTeam[0].statistics.filter((stat) => {
			return stat.name === "hits";
		});
		errors = awayTeam[0].statistics.filter((stat) => {
			return stat.name === "errors";
		});
		awayPeriods = [runs[0], hits[0], errors[0]];

		runs = homeTeam[0].statistics.filter((stat) => {
			return stat.name === "runs";
		});
		hits = homeTeam[0].statistics.filter((stat) => {
			return stat.name === "hits";
		});
		errors = homeTeam[0].statistics.filter((stat) => {
			return stat.name === "errors";
		});
		homePeriods = [runs[0], hits[0], errors[0]];
	} else if (
		game.status.type.description === "In Progress" ||
		game.status.type.description === "End of Period" ||
		game.status.type.description === "Halftime" ||
		game.status.type.completed
	) {
		awayPeriods = awayTeam[0].linescores;
		homePeriods = homeTeam[0].linescores;
	} else {
		awayPeriods = [];
		homePeriods = [];
	}

	if (!game.competitions[0].competitors[0].records) {
		homeRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
		awayRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
	} else if (game.competitions[0].competitors[0].records.length > 1) {
		homeRecords = homeTeam[0].records;
		awayRecords = awayTeam[0].records;
	} else {
		homeRecords = [...homeTeam[0].records, ...temp];
		awayRecords = [...awayTeam[0].records, ...temp];
	}

	return {
		sportName: sportName,
		status: game.status,
		shortDetail: game.competitions[0].status.type.shortDetail,
		detail: game.competitions[0].status.type.detail,
		away: {
			abbreviation: awayTeam[0].team.abbreviation,
			alternateColor: `#${awayTeam[0].team.alternateColor}`,
			color: `#${awayTeam[0].team.color}`,
			logo: awayTeam[0].team.logo,
			name: awayTeam[0].team.shortDisplayName,
			records: awayRecords,
			score: parseInt(awayTeam[0].score),
			periods: awayPeriods,
			winProbability: 0,
		},
		home: {
			abbreviation: homeTeam[0].team.abbreviation,
			alternateColor: `#${homeTeam[0].team.alternateColor}`,
			color: `#${homeTeam[0].team.color}`,
			logo: homeTeam[0].team.logo,
			name: homeTeam[0].team.shortDisplayName,
			records: homeRecords,
			score: parseInt(homeTeam[0].score),
			periods: homePeriods,
			winProbability: 0,
		},
	};
}

export function GamePlayHelper(game, sportName) {
	const { homeTeam, awayTeam } = homeAwayHelper(game);
	let away, home, status, situation, headlines, venue, tickets, weather, odds, lastPlay, team;
	away = { id: awayTeam[0].team.id, name: awayTeam[0].team.displayName.split(" ").pop(), links: [] };
	home = { id: homeTeam[0].team.id, name: homeTeam[0].team.displayName.split(" ").pop(), links: [] };

	if (game.weather) {
		weather = game.weather;
		if (!weather.temperature) weather.temperature = weather.highTemperature;
	}
	if (game.competitions[0].situation) situation = game.competitions[0].situation;
	if (game.competitions[0].headlines) headlines = game.competitions[0].headlines[0];
	if (game.competitions[0].odds) odds = game.competitions[0].odds[0];
	if (game.competitions[0].tickets) tickets = game.competitions[0].tickets[0];
	status = game.competitions[0].status;
	venue = game.competitions[0].venue;
	away.links = awayTeam[0].team.links.filter((link) => {
		return link.text === "Roster" || link.text === "Statistics" || link.text === "Schedule";
	});
	home.links = homeTeam[0].team.links.filter((link) => {
		return link.text === "Roster" || link.text === "Statistics" || link.text === "Schedule";
	});

	if (headlines)
		headlines.link = game.links.filter((link) => {
			return link.text === headlines.type;
		});

	if (game.status.type.state === "in") {
		if (game.competitions[0].situation.lastPlay.team)
			team =
				game.competitions[0].situation.lastPlay.team.id === homeTeam[0].team.id
					? homeTeam[0].team
					: awayTeam[0].team;
		if (sportName === "NFL") {
			lastPlay = {
				...game.competitions[0].situation.lastPlay,
				team,
			};
		} else {
			lastPlay = {
				athletes: game.competitions[0].situation.lastPlay.athletesInvolved,
				text: game.competitions[0].situation.lastPlay.text,
				type: game.competitions[0].situation.lastPlay.type,
				team,
			};
		}
		situation = { ...situation, lastPlay };
	}

	if (game.status.type.state === "post") {
		if (game.competitions[0].situation?.lastPlay.team)
			team =
				game.competitions[0].situation?.lastPlay.team.id === homeTeam[0].team.id
					? homeTeam[0].team
					: awayTeam[0].team;
		if (sportName === "NFL") {
			lastPlay = {
				...game.competitions[0].situation?.lastPlay,
				team:
					game.competitions[0].situation?.lastPlay.team.id === homeTeam[0].team.id
						? homeTeam[0].team
						: awayTeam[0].team,
			};
			situation = { ...situation, lastPlay };
		}
	}

	return { away, home, status, situation, headlines, venue, tickets, weather, odds, lastPlay };
}

export function GameLeadersHelper(game, sportName) {
	const { homeTeam, awayTeam } = homeAwayHelper(game);
	let athletes = [];
	let awayAthlete = {},
		homeAthlete = {};

	if (awayTeam[0].leaders) {
		let athlete = awayTeam[0].leaders[awayTeam[0].leaders.length - 1];
		awayAthlete = {
			title: "PLAYERS TO WATCH",
			headshot: athlete?.leaders[0].athlete.headshot,
			displayName: athlete?.leaders[0].athlete.displayName,
			team: awayTeam[0].team.abbreviation,
			position: athlete?.leaders[0].athlete.position?.abbreviation,
			displayValue: athlete?.leaders[0].displayValue,
			type: "pre",
		};
	}

	if (homeTeam[0].leaders) {
		let athlete = homeTeam[0].leaders[homeTeam[0].leaders.length - 1];
		homeAthlete = {
			title: "PLAYERS TO WATCH",
			headshot: athlete?.leaders[0].athlete.headshot,
			displayName: athlete?.leaders[0].athlete.displayName,
			team: homeTeam[0].team.abbreviation,
			position: athlete?.leaders[0].athlete.position?.abbreviation,
			displayValue: athlete?.leaders[0].displayValue,
			type: "pre",
		};
	}

	if (
		(game.competitions[0].status.type.name === "STATUS_SCHEDULED" ||
			game.competitions[0].status.type.name === "STATUS_POSTPONED") &&
		sportName === "MLB"
	) {
		if (awayTeam[0].probables) {
			awayAthlete = awayTeam[0].probables.map((athlete) => {
				return {
					title: athlete.displayName,
					headshot: athlete.athlete.headshot,
					displayName: athlete.athlete.displayName,
					team: awayTeam[0].team.abbreviation,
					position: athlete.athlete.position,
					statistics: athlete.statistics,
					displayValue: null,
					type: "pre",
				};
			});
		} else awayAthlete = null;
		if (homeTeam[0].probables) {
			homeAthlete = homeTeam[0].probables.map((athlete) => {
				return {
					title: athlete.displayName,
					headshot: athlete.athlete.headshot,
					displayName: athlete.athlete.displayName,
					team: homeTeam[0].team.abbreviation,
					position: athlete.athlete.position,
					statistics: athlete.statistics,
					displayValue: null,
					type: "pre",
				};
			});
		} else homeAthlete = null;
		athletes.push(awayAthlete, homeAthlete);
	} else if (
		(game.competitions[0].status.type.name === "STATUS_SCHEDULED" ||
			game.competitions[0].status.type.name === "STATUS_POSTPONED") &&
		sportName === "NFL"
	) {
		awayAthlete = {
			title: "TEAM INFORMATION",
			type: "pre",
			team: {
				name: awayTeam[0].team.displayName.split(" ").pop(),
				side: "away",
				links: awayTeam[0].team.links.filter((link) => {
					return link.text === "Roster" || link.text === "Statistics" || link.text === "Schedule";
				}),
			},
		};
		homeAthlete = {
			title: "TEAM INFORMATION",
			type: "pre",
			team: {
				name: homeTeam[0].team.displayName.split(" ").pop(),
				side: "home",
				links: homeTeam[0].team.links.filter((link) => {
					return link.text === "Roster" || link.text === "Statistics" || link.text === "Schedule";
				}),
			},
		};
		athletes.push(awayAthlete, homeAthlete);
	} else if (
		game.competitions[0].status.type.name === "STATUS_SCHEDULED" ||
		game.competitions[0].status.type.name === "STATUS_POSTPONED"
	) {
		athletes.push(awayAthlete, homeAthlete);
	} else if (
		game.competitions[0].status.type.description === "In Progress" ||
		game.competitions[0].status.type.description === "End of Period" ||
		game.competitions[0].status.type.description === "Halftime" ||
		game.competitions[0].status.type.description === "Rain Delay"
	) {
		if (game.competitions[0].situation.dueUp) {
			athletes = game.competitions[0].situation.dueUp.map((athlete) => {
				return {
					title: "DUE UP FOR",
					headshot: athlete.athlete.headshot,
					displayName: athlete.athlete.shortName,
					team:
						athlete.athlete.team.id === homeTeam[0].team.id
							? homeTeam[0].team.location
							: awayTeam[0].team.location,
					position: athlete.athlete.position,
					displayValue: athlete.summary,
					type: "dueUp",
				};
			});
		} else if (game.competitions[0].situation.pitcher && game.competitions[0].situation.batter) {
			let pitcher = {
				title: "PITCHING",
				headshot: game.competitions[0].situation.pitcher.athlete.headshot,
				displayName: game.competitions[0].situation.pitcher.athlete.shortName,
				team:
					game.competitions[0].situation.pitcher.athlete.team.id === homeTeam[0].team.id
						? homeTeam[0].team.abbreviation
						: awayTeam[0].team.abbreviation,
				position: game.competitions[0].situation.pitcher.athlete.position,
				displayValue: game.competitions[0].situation.pitcher.summary,
				type: "in",
			};
			let batter = {
				title: "BATTING",
				headshot: game.competitions[0].situation.batter.athlete.headshot,
				displayName: game.competitions[0].situation.batter.athlete.shortName,
				team:
					game.competitions[0].situation.batter.athlete.team.id === homeTeam[0].team.id
						? homeTeam[0].team.abbreviation
						: awayTeam[0].team.abbreviation,
				position: game.competitions[0].situation.batter.athlete.position,
				displayValue: game.competitions[0].situation.batter.summary,
				type: "in",
			};
			athletes.push(pitcher, batter);
		} else if (sportName === "NFL") {
			athletes = game.competitions[0].leaders?.map((athlete) => {
				return {
					title: "TOP PERFORMERS",
					position: athlete.shortDisplayName,
					headshot: athlete.leaders[0].athlete.headshot,
					displayName: athlete.leaders[0].athlete.displayName,
					team:
						athlete.leaders[0].team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					displayValue: athlete.leaders[0].displayValue,
					type: "completed",
				};
			});
		} else if (sportName === "NCAA Football") {
			athletes = game.competitions[0].leaders?.map((athlete) => {
				return {
					title: "TOP PERFORMERS",
					position: athlete.shortDisplayName,
					headshot: athlete.leaders[0].athlete.headshot,
					displayName: athlete.leaders[0].athlete.displayName,
					team:
						athlete.leaders[0].team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					displayValue: athlete.leaders[0].displayValue,
					type: "completed",
				};
			});
		} else {
			if (awayAthlete) awayAthlete.type = "in";
			if (homeAthlete) homeAthlete.type = "in";
			athletes.push(awayAthlete, homeAthlete);
		}
	} else if (game.competitions[0].status.type.completed) {
		if (sportName === "NHL") {
			athletes = game.competitions[0].status.featuredAthletes;
			let threeStars = athletes?.splice(2, 5);

			athletes = threeStars?.map((athlete) => {
				return {
					title: athlete.shortDisplayName,
					headshot: athlete.athlete.headshot,
					displayName: athlete.athlete.displayName,
					team:
						athlete.athlete.team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					position: athlete.athlete.position,
					statistics: athlete.statistics,
					displayValue: null,
					type: "completed",
				};
			});
		} else if (sportName === "MLB") {
			athletes = game.competitions[0].status.featuredAthletes?.map((athlete) => {
				return {
					title: athlete.shortDisplayName,
					headshot: athlete.athlete.headshot,
					displayName: athlete.athlete.displayName,
					team:
						athlete.athlete.team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					position: athlete.athlete.position,
					statistics: athlete.statistics,
					displayValue: null,
					type: "completed",
				};
			});
		} else if (sportName === "NFL") {
			athletes = game.competitions[0].leaders?.map((athlete) => {
				return {
					title: "TOP PERFORMERS",
					position: athlete.shortDisplayName,
					headshot: athlete.leaders[0].athlete.headshot,
					displayName: athlete.leaders[0].athlete.displayName,
					team:
						athlete.leaders[0].team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					displayValue: athlete.leaders[0].displayValue,
					type: "completed",
				};
			});
		} else if (sportName === "NCAA Football") {
			athletes = game.competitions[0].leaders?.map((athlete) => {
				return {
					title: "TOP PERFORMERS",
					position: athlete.shortDisplayName,
					headshot: athlete.leaders[0].athlete.headshot,
					displayName: athlete.leaders[0].athlete.displayName,
					team:
						athlete.leaders[0].team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					displayValue: athlete.leaders[0].displayValue,
					type: "completed",
				};
			});
		} else {
			awayAthlete.title = "TOP PERFORMERS";
			awayAthlete.type = "completed";

			homeAthlete.title = "TOP PERFORMERS";
			homeAthlete.type = "completed";
			athletes.push(awayAthlete, homeAthlete);
		}
	}

	return {
		athletes: athletes?.flat(),
	};
}

export function BetModalHelper(game, sportName) {
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
	let gameScoreData = GameScoreHelper(game, sportName);
	let bookmakers = game.competitions[0].odds?.map((odd) => {
		if (odd.awayTeamOdds) {
			if (odd.awayTeamOdds.winPercentage) {
				gameScoreData.away.winProbability = odd.awayTeamOdds.winPercentage * 0.01;
				gameScoreData.home.winProbability = odd.homeTeamOdds.winPercentage * 0.01;
			} else if (odd.awayTeamOdds.moneyLine) {
				if (odd.awayTeamOdds.moneyLine < 0) {
					gameScoreData.away.winProbability =
						(-1 * odd.awayTeamOdds.moneyLine) / (-1 * odd.awayTeamOdds.moneyLine + 100);
				} else if (odd.awayTeamOdds.moneyLine > 0) {
					gameScoreData.away.winProbability = 100 / (odd.awayTeamOdds.moneyLine + 100);
				}
				if (odd.homeTeamOdds.moneyLine < 0) {
					gameScoreData.home.winProbability =
						(-1 * odd.homeTeamOdds.moneyLine) / (-1 * odd.homeTeamOdds.moneyLine + 100);
				} else if (odd.homeTeamOdds.moneyLine > 0) {
					gameScoreData.home.winProbability = 100 / (odd.homeTeamOdds.moneyLine + 100);
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
			if (favoriteTeam === gameScoreData.away.abbreviation) {
				if (favoritePercentage && underdogPercentage) {
					gameScoreData.away.winProbability = favoritePercentage;
					gameScoreData.home.winProbability = underdogPercentage;
				} else {
					if (sportName === "NCAA Football") {
						if (Math.abs(favoriteValue) >= 20) {
							gameScoreData.away.winProbability = spreadPercentages.ncaaf[20].favorite;
							gameScoreData.home.winProbability = spreadPercentages.ncaaf[20].underdog;
						} else {
							gameScoreData.away.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].favorite;
							gameScoreData.home.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].underdog;
						}
					} else if (sportName === "NFL") {
						if (Math.abs(favoriteValue) >= 17) {
							gameScoreData.away.winProbability = spreadPercentages.nfl[17].favorite;
							gameScoreData.home.winProbability = spreadPercentages.nfl[17].underdog;
						} else {
							gameScoreData.away.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].favorite;
							gameScoreData.home.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].underdog;
						}
					} else if (sportName === "NBA") {
						if (Math.abs(favoriteValue) >= 13.5) {
							gameScoreData.away.winProbability = spreadPercentages.nba[13.5].favorite;
							gameScoreData.home.winProbability = spreadPercentages.nba[13.5].underdog;
						} else {
							gameScoreData.away.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].favorite;
							gameScoreData.home.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].underdog;
						}
					} else if (sportName === "NCAA Men's Basketball") {
						if (Math.abs(favoriteValue) >= 13) {
							gameScoreData.away.winProbability = spreadPercentages.ncaab[13].favorite;
							gameScoreData.home.winProbability = spreadPercentages.ncaab[13].underdog;
						} else {
							gameScoreData.away.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].favorite;
							gameScoreData.home.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].underdog;
						}
					}
				}
			} else {
				if (favoritePercentage && underdogPercentage) {
					gameScoreData.home.winProbability = favoritePercentage;
					gameScoreData.away.winProbability = underdogPercentage;
				} else {
					if (sportName === "NCAA Football") {
						if (Math.abs(favoriteValue) >= 20) {
							gameScoreData.home.winProbability = spreadPercentages.ncaaf[20].favorite;
							gameScoreData.away.winProbability = spreadPercentages.ncaaf[20].underdog;
						} else {
							gameScoreData.home.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].favorite;
							gameScoreData.away.winProbability = spreadPercentages.ncaaf[Math.abs(favoriteValue)].underdog;
						}
					} else if (sportName === "NFL") {
						if (Math.abs(favoriteValue) >= 17) {
							gameScoreData.home.winProbability = spreadPercentages.nfl[17].favorite;
							gameScoreData.away.winProbability = spreadPercentages.nfl[17].underdog;
						} else {
							gameScoreData.home.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].favorite;
							gameScoreData.away.winProbability = spreadPercentages.nfl[Math.abs(favoriteValue)].underdog;
						}
					} else if (sportName === "NBA") {
						if (Math.abs(favoriteValue) >= 13.5) {
							gameScoreData.home.winProbability = spreadPercentages.nba[13.5].favorite;
							gameScoreData.away.winProbability = spreadPercentages.nba[13.5].underdog;
						} else {
							gameScoreData.home.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].favorite;
							gameScoreData.away.winProbability = spreadPercentages.nba[Math.abs(favoriteValue)].underdog;
						}
					} else if (sportName === "NCAA Men's Basketball") {
						if (Math.abs(favoriteValue) >= 13) {
							gameScoreData.home.winProbability = spreadPercentages.ncaab[13].favorite;
							gameScoreData.away.winProbability = spreadPercentages.ncaab[13].underdog;
						} else {
							gameScoreData.home.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].favorite;
							gameScoreData.away.winProbability = spreadPercentages.ncaab[Math.abs(favoriteValue)].underdog;
						}
					}
				}
			}
		}
		return {
			key: odd.provider.name,
			title: odd.provider.name,
			market: {
				away: { name: gameScoreData.away.name, winProbability: gameScoreData.away.winProbability },
				home: { name: gameScoreData.home.name, winProbability: gameScoreData.home.winProbability },
			},
			details: odd.details,
			overUnder: odd.overUnder,
		};
	});

	return {
		...gameScoreData,
		away: { ...gameScoreData.away, winProbability: (gameScoreData.away.winProbability * 100).toFixed(1) },
		home: { ...gameScoreData.home, winProbability: (gameScoreData.home.winProbability * 100).toFixed(1) },
		id: game.id,
		date: game.date,
		name: game.name,
		odds: bookmakers,
	};
}
