const capitalize = ([firstLetter, ...restOfWord]) => firstLetter.toUpperCase() + restOfWord.join("");

function requesterAccepterHelper(game, requesterPickName) {
	let requesterPickTeam = game.competitions[0].competitors.filter((team) => {
		return team.team.shortDisplayName === requesterPickName;
	});
	let acceptingPickTeam = game.competitions[0].competitors.filter((team) => {
		return team.team.shortDisplayName !== requesterPickName;
	});
	return { requesterPickTeam, acceptingPickTeam };
}
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
	let odd = outcomes.find((outcome) => outcome.name.includes(teamPick.team.name));
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
	const { requesterPickTeam, acceptingPickTeam } = requesterAccepterHelper(bet.event, bet.details.winner);
	let requesterPickTeamRecords, acceptingPickTeamRecords;
	let temp = [
		{ name: "Home", type: "home", summary: 0 },
		{ name: "Away", type: "away", summary: 0 },
	];

	if (!bet.event.competitions[0].competitors[0].records) {
		requesterPickTeamRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
		acceptingPickTeamRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
	} else if (bet.event.competitions[0].competitors[0].records.length > 1) {
		requesterPickTeamRecords = requesterPickTeam[0].records;
		acceptingPickTeamRecords = acceptingPickTeam[0].records;
	} else {
		requesterPickTeamRecords = [...requesterPickTeam[0].records, ...temp];
		acceptingPickTeamRecords = [...acceptingPickTeam[0].records, ...temp];
	}

	return {
		date: bet.details.date,
		sportName: bet.details.displayName,
		status: bet.event.status,
		shortDetail: bet.event.competitions[0].status.type.shortDetail,
		detail: bet.event.competitions[0].status.type.detail,
		acceptingTeam: {
			abbreviation: acceptingPickTeam[0].team.abbreviation,
			alternateColor: `#${acceptingPickTeam[0].team.alternateColor}`,
			color: `#${acceptingPickTeam[0].team.color}`,
			logo: acceptingPickTeam[0].team.logo,
			name: acceptingPickTeam[0].team.shortDisplayName,
			records: acceptingPickTeamRecords,
			score: parseInt(acceptingPickTeam[0].score),
			homeAway: capitalize(acceptingPickTeam[0].homeAway),
		},
		requesterTeam: {
			abbreviation: requesterPickTeam[0].team.abbreviation,
			alternateColor: `#${requesterPickTeam[0].team.alternateColor}`,
			color: `#${requesterPickTeam[0].team.color}`,
			logo: requesterPickTeam[0].team.logo,
			name: requesterPickTeam[0].team.shortDisplayName,
			records: requesterPickTeamRecords,
			score: parseInt(requesterPickTeam[0].score),
			homeAway: capitalize(requesterPickTeam[0].homeAway),
		},
	};
}

export function BetGameOdds(bet) {
	const { homeTeam, awayTeam } = homeAwayHelper(bet.event);
	const bookmakers = bet.odds?.bookmakers.map((odd) => {
		return {
			key: odd.key,
			title: odd.title,
			market: marketHelper(odd.markets[0], awayTeam[0], homeTeam[0]),
		};
	});
	const awayAvgProb =
		(bookmakers?.reduce((total, bookmaker, index, array) => {
			return (total += bookmaker.market.away.winProbability);
		}, 0) /
			bookmakers.length) *
		100;
	const homeAvgProb =
		(bookmakers.reduce((total, bookmaker, index, array) => {
			return (total += bookmaker.market.home.winProbability);
		}, 0) /
			bookmakers?.length) *
		100;

	return {
		sportName: bet.details.displayName,
		status: bet.event.status,
		odds: bookmakers,
		away: {
			abbreviation: awayTeam[0].team.abbreviation,
			alternateColor: `#${awayTeam[0].team.alternateColor}`,
			color: `#${awayTeam[0].team.color}`,
			logo: awayTeam[0].team.logo,
			name: awayTeam[0].team.shortDisplayName,
			winProb: awayAvgProb.toFixed(1),
		},
		home: {
			abbreviation: homeTeam[0].team.abbreviation,
			alternateColor: `#${homeTeam[0].team.alternateColor}`,
			color: `#${homeTeam[0].team.color}`,
			logo: homeTeam[0].team.logo,
			name: homeTeam[0].team.shortDisplayName,
			winProb: homeAvgProb.toFixed(1),
		},
	};
}
