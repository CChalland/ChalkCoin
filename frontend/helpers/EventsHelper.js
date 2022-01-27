import axios from "axios";

let leagues = [
	{
		abbrv: "NCAAF",
		sport: "football",
		display_name: "NCAA Football",
		league_name: "college-football",
		data: [],
	},
	{
		abbrv: "NFL",
		sport: "football",
		display_name: "NFL",
		league_name: "nfl",
		data: [],
	},
	{
		abbrv: "MLB",
		sport: "baseball",
		display_name: "MLB",
		league_name: "mlb",
		data: [],
	},
	{
		abbrv: "NBA",
		sport: "basketball",
		display_name: "NBA",
		league_name: "nba",
		data: [],
	},
	{
		abbrv: "NCAAB",
		sport: "basketball",
		display_name: "NCAA Men's Basketball",
		league_name: "mens-college-basketball",
		data: [],
	},
	{
		abbrv: "NHL",
		sport: "hockey",
		display_name: "NHL",
		league_name: "nhl",
		data: [],
	},
	{
		abbrv: "WNBA",
		sport: "basketball",
		display_name: "WNBA",
		league_name: "wnba",
		data: [],
	},
	// { abbrv: "MLS", sport: "soccer", display_name: "MLS", league_name: "MLS", data: [] },
];

export async function EventFinder(transaction) {
	const now = new Date();
	const date = new Date(transaction.details.date);
	const timeDiff = (date.getTime() - now.getTime()) / (3600 * 1000);
	const yyyymmdd = date.yyyymmdd();
	const leagueIndex = leagues.findIndex((league) => league.display_name === transaction.details.sport);
	let event, openStatus;
	if (leagues[leagueIndex].data.some((event) => event.id === transaction.details.gameId)) {
		event = leagues[leagueIndex].data.find((event) => event.id === transaction.details.gameId);
	} else {
		const response = await axios.get(
			`//site.api.espn.com/apis/site/v2/sports/${leagues[leagueIndex].sport}/${leagues[leagueIndex].league_name}/scoreboard?dates=${yyyymmdd}`
		);
		leagues[leagueIndex].data = [...leagues[leagueIndex].data, ...response.data.events];
		event = response.data.events.find((event) => event.id === transaction.details.gameId);
	}

	if (!event) {
		const response = await axios.get(
			`//site.api.espn.com/apis/site/v2/sports/${leagues[leagueIndex].sport}/${leagues[leagueIndex].league_name}/scoreboard/${bet.details.gameId}`
		);
		leagues[leagueIndex].data = [...leagues[leagueIndex].data, response.data];
		event = response.data;
	}

	if (event?.status.type.name === "STATUS_FINAL") {
		openStatus = "Ended";
	} else if (event?.status.type.state === "in") {
		openStatus = event.status.period <= 1 ? "danger" : "Closed";
	} else if (event?.status.type.state === "pre") {
		if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth()) {
			openStatus = timeDiff <= 2 ? "warning" : "info";
		}
	}

	return { ...transaction, event, openStatus };
}

export async function EventsFinder(transactions, type) {
	let bets = type === "league" ? transactions.bets : transactions;
	try {
		bets = await Promise.all(
			bets.map(async (bet) => {
				if (bet.details.type === "Mine Reward") {
					return bet;
				} else {
					const now = new Date();
					const date = new Date(bet.details.date);
					const timeDiff = (date.getTime() - now.getTime()) / (3600 * 1000);
					const yyyymmdd = date.yyyymmdd();
					const leagueIndex = leagues.findIndex((league) => league.display_name === bet.details.sport);
					let event, openStatus;
					if (leagues[leagueIndex].data.some((event) => event.id === bet.details.gameId)) {
						event = leagues[leagueIndex].data.find((event) => event.id === bet.details.gameId);
					} else {
						const response = await axios.get(
							`//site.api.espn.com/apis/site/v2/sports/${leagues[leagueIndex].sport}/${leagues[leagueIndex].league_name}/scoreboard?dates=${yyyymmdd}`
						);
						leagues[leagueIndex].data = [...leagues[leagueIndex].data, ...response.data.events];
						event = response.data.events.find((event) => event.id === bet.details.gameId);
					}

					if (!event) {
						const response = await axios.get(
							`//site.api.espn.com/apis/site/v2/sports/${leagues[leagueIndex].sport}/${leagues[leagueIndex].league_name}/scoreboard/${bet.details.gameId}`
						);
						leagues[leagueIndex].data = [...leagues[leagueIndex].data, response.data];
						event = response.data;
					}

					if (event?.status.type.name === "STATUS_FINAL") {
						openStatus = "Ended";
					} else if (event?.status.type.state === "in") {
						openStatus = event.status.period <= 1 ? "danger" : "Closed";
					} else if (event?.status.type.state === "pre") {
						if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth()) {
							openStatus = timeDiff <= 2 ? "warning" : "info";
						}
					}

					return { ...bet, event, openStatus };
				}
			})
		);
	} catch (err) {
		console.log(err.message);
	}
	return type === "league" ? { ...transactions, bets } : bets;
}
