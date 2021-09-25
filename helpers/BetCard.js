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
	let requesterPickTeamPeriods, acceptingPickTeamPeriods, requesterPickTeamRecords, acceptingPickTeamRecords;
	let temp = [
		{ name: "Home", type: "home", summary: 0 },
		{ name: "Away", type: "away", summary: 0 },
	];

	if (bet.details.displayName === "MLB") {
		let runs, hits, errors;
		runs = acceptingPickTeam[0].statistics.filter((stat) => {
			return stat.name === "runs";
		});
		hits = acceptingPickTeam[0].statistics.filter((stat) => {
			return stat.name === "hits";
		});
		errors = acceptingPickTeam[0].statistics.filter((stat) => {
			return stat.name === "errors";
		});
		acceptingPickTeamPeriods = [runs[0], hits[0], errors[0]];

		runs = requesterPickTeam[0].statistics.filter((stat) => {
			return stat.name === "runs";
		});
		hits = requesterPickTeam[0].statistics.filter((stat) => {
			return stat.name === "hits";
		});
		errors = requesterPickTeam[0].statistics.filter((stat) => {
			return stat.name === "errors";
		});
		requesterPickTeamPeriods = [runs[0], hits[0], errors[0]];
	} else if (
		bet.event.status.type.description === "In Progress" ||
		bet.event.status.type.description === "End of Period" ||
		bet.event.status.type.description === "Halftime" ||
		bet.event.status.type.completed
	) {
		acceptingPickTeamPeriods = acceptingPickTeam[0].linescores;
		requesterPickTeamPeriods = requesterPickTeam[0].linescores;
	} else {
		acceptingPickTeamPeriods = [];
		requesterPickTeamPeriods = [];
	}

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
		sportName: bet.details.displayName,
		status: bet.event.status,
		shortDetail: bet.event.competitions[0].status.type.shortDetail,
		acceptingTeam: {
			abbreviation: acceptingPickTeam[0].team.abbreviation,
			alternateColor: acceptingPickTeam[0].team.alternateColor,
			color: acceptingPickTeam[0].team.color,
			logo: acceptingPickTeam[0].team.logo,
			name: acceptingPickTeam[0].team.shortDisplayName,
			records: acceptingPickTeamRecords,
			score: parseInt(acceptingPickTeam[0].score),
			periods: acceptingPickTeamPeriods,
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
			periods: requesterPickTeamPeriods,
			homeAway: capitalize(requesterPickTeam[0].homeAway),
		},
	};
}
