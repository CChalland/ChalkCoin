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
		status: game.status,
		shortDetail: game.competitions[0].status.type.shortDetail,
		detail: game.competitions[0].status.type.detail,
		away: {
			logo: awayTeam[0].team.logo,
			name: awayTeam[0].team.name,
			records: awayRecords,
			score: awayTeam[0].score,
			periods: awayPeriods,
		},
		home: {
			logo: homeTeam[0].team.logo,
			name: homeTeam[0].team.name,
			records: homeRecords,
			score: homeTeam[0].score,
			periods: homePeriods,
		},
	};
}

export function GamePlayHelper(game) {
	const { homeTeam, awayTeam } = homeAwayHelper(game);
	let status, situation, headlines, venue, tickets, weather, odds, lastPlay, team;

	if (game.weather) weather = game.weather;
	if (game.competitions[0].situation) situation = game.competitions[0].situation;
	if (game.competitions[0].headlines) headlines = game.competitions[0].headlines[0];
	if (game.competitions[0].odds) odds = game.competitions[0].odds[0];
	if (game.competitions[0].tickets) tickets = game.competitions[0].tickets[0];
	status = game.competitions[0].status;
	venue = game.competitions[0].venue;

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
		lastPlay = {
			athletes: game.competitions[0].situation.lastPlay.athletesInvolved,
			text: game.competitions[0].situation.lastPlay.text,
			type: game.competitions[0].situation.lastPlay.type,
			team,
		};
	}
	return { status, situation, headlines, venue, tickets, weather, odds, lastPlay };
}

export function GameLeadersHelper(game, sportName) {
	const { homeTeam, awayTeam } = homeAwayHelper(game);
	let athletes = [];
	let awayAthlete, homeAthlete;

	if (awayTeam[0].leaders) {
		let athlete = awayTeam[0].leaders[awayTeam[0].leaders.length - 1];
		awayAthlete = {
			title: "PLAYERS TO WATCH",
			headshot: athlete.leaders[0].athlete.headshot,
			displayName: athlete.leaders[0].athlete.displayName,
			team: awayTeam[0].team.abbreviation,
			position: athlete.leaders[0].athlete.position.abbreviation,
			displayValue: athlete.leaders[0].displayValue,
			type: "pre",
		};
	}

	if (homeTeam[0].leaders) {
		let athlete = homeTeam[0].leaders[homeTeam[0].leaders.length - 1];
		homeAthlete = {
			title: "PLAYERS TO WATCH",
			headshot: athlete.leaders[0].athlete.headshot,
			displayName: athlete.leaders[0].athlete.displayName,
			team: homeTeam[0].team.abbreviation,
			position: athlete.leaders[0].athlete.position.abbreviation,
			displayValue: athlete.leaders[0].displayValue,
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
		} else {
			if (awayAthlete) awayAthlete.type = "in";
			if (homeAthlete) homeAthlete.type = "in";
			athletes.push(awayAthlete, homeAthlete);
		}
	} else if (game.competitions[0].status.type.completed) {
		if (sportName === "NHL") {
			athletes = [...game.competitions[0].status.featuredAthletes];
			let threeStars = athletes.splice(2, 5);

			athletes = threeStars.map((athlete) => {
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
			athletes = game.competitions[0].status.featuredAthletes.map((athlete) => {
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
		} else {
			awayAthlete.title = "TOP PERFORMERS";
			awayAthlete.type = "completed";

			homeAthlete.title = "TOP PERFORMERS";
			homeAthlete.type = "completed";
			athletes.push(awayAthlete, homeAthlete);
		}
	}

	return {
		athletes: athletes.flat(),
	};
}
