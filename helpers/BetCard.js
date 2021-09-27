const capitalize = ([firstLetter, ...restOfWord]) => firstLetter.toUpperCase() + restOfWord.join("");
function homeAwayHelper(game, requesterPickName) {
	let requesterPickTeam = game.competitions[0].competitors.filter((team) => {
		return team.team.shortDisplayName === requesterPickName;
	});
	let acceptingPickTeam = game.competitions[0].competitors.filter((team) => {
		return team.team.shortDisplayName !== requesterPickName;
	});
	return { requesterPickTeam, acceptingPickTeam };
}

export function BetGameData(bet) {
	const { requesterPickTeam, acceptingPickTeam } = homeAwayHelper(bet.event, bet.details.winner);
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
			alternateColor: acceptingPickTeam[0].team.alternateColor,
			color: acceptingPickTeam[0].team.color,
			logo: acceptingPickTeam[0].team.logo,
			name: acceptingPickTeam[0].team.shortDisplayName,
			records: acceptingPickTeamRecords,
			score: parseInt(acceptingPickTeam[0].score),
			homeAway: capitalize(acceptingPickTeam[0].homeAway),
		},
		requesterTeam: {
			abbreviation: requesterPickTeam[0].team.abbreviation,
			alternateColor: requesterPickTeam[0].team.alternateColor,
			color: requesterPickTeam[0].team.color,
			logo: requesterPickTeam[0].team.logo,
			name: requesterPickTeam[0].team.shortDisplayName,
			records: requesterPickTeamRecords,
			score: parseInt(requesterPickTeam[0].score),
			homeAway: capitalize(requesterPickTeam[0].homeAway),
		},
	};
}

// export function BetGameData(bets) {}
