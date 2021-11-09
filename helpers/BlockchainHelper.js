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

export async function EventsFinder(transactions) {
	let bets = transactions;
	try {
		bets = await Promise.all(
			bets.map(async (bet) => {
				if (bet.details.type === "Mine Reward") {
					return bet;
				} else {
					const date = new Date(bet.details.date);
					const yyyymmdd = date.yyyymmdd();
					const leagueIndex = leagues.findIndex((league) => league.display_name === bet.details.sport);
					let event;
					if (leagues[leagueIndex].data.some((event) => event.id === bet.details.gameId)) {
						event = leagues[leagueIndex].data.find((event) => event.id === bet.details.gameId);
					} else {
						const response = await axios.get(
							`http://site.api.espn.com/apis/site/v2/sports/${leagues[leagueIndex].sport}/${leagues[leagueIndex].league_name}/scoreboard?dates=${yyyymmdd}`
						);
						leagues[leagueIndex].data = [...leagues[leagueIndex].data, ...response.data.events];
						event = response.data.events.find((event) => event.id === bet.details.gameId);
					}
					return { ...bet, event };
				}
			})
		);
	} catch (err) {
		console.log(err.message);
	}
	return bets;
}
