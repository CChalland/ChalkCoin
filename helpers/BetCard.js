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
	let homeRecords, awayRecords;
	let temp = [
		{ name: "Home", type: "home", summary: 0 },
		{ name: "Away", type: "away", summary: 0 },
	];

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
		date: bet.details.date,
		sportName: bet.details.displayName,
		status: bet.event.status,
		shortDetail: bet.event.competitions[0].status.type.shortDetail,
		detail: bet.event.competitions[0].status.type.detail,
		odds: bookmakers,
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
			winProb: awayAvgProb.toFixed(1),
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
			winProb: homeAvgProb.toFixed(1),
		},
	};
}
