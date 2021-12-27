import { createContext, useContext, useCallback, useReducer, useEffect, useState } from "react";
import axios from "axios";
import sportsReducer from "../reducers/Sports.Reducer";

export const SportContext = createContext();
export const SportDispatch = createContext();
let initialSportsData = [
	{
		id: 1,
		abbrv: "NCAAF",
		sport: "football",
		display_name: "NCAA Football",
		league_name: "college-football",
		data: { days: [] },
		reload: false,
		path: "/games?sport=ncaaf",
		name: "Football",
		image: "../../static/media/sports-icons/1.png",
		mini: "NCAAB",
	},
	{
		id: 2,
		abbrv: "NFL",
		sport: "football",
		display_name: "NFL",
		league_name: "nfl",
		data: { days: [] },
		reload: false,
		path: "/games?sport=nfl",
		name: "NFL",
		image: "../../static/media/sports-icons/2.png",
		mini: "NFL",
	},
	{
		id: 3,
		abbrv: "MLB",
		sport: "baseball",
		display_name: "MLB",
		league_name: "mlb",
		data: { days: [] },
		reload: false,
		path: "/games?sport=mlb",
		name: "MLB",
		image: "../../static/media/sports-icons/3.png",
		mini: "../../static/media/sports-icons/3.png",
	},
	{
		id: 4,
		abbrv: "NBA",
		sport: "basketball",
		display_name: "NBA",
		league_name: "nba",
		data: { days: [] },
		reload: false,
		path: "/games?sport=nba",
		name: "NBA",
		image: "../../static/media/sports-icons/4.png",
		mini: "../../static/media/sports-icons/4.png",
	},
	// {
	// 	id: 5,
	// 	abbrv: "NCAAB",
	// 	sport: "basketball",
	// 	display_name: "NCAA Men's Basketball",
	// 	league_name: "mens-college-basketball",
	// 	data: {days: []},
	// 	reload: false,
	// 	path: "/games?sport=ncaab",
	// 	name: "Basketball",
	// 	image: "../../static/media/sports-icons/5.png",
	// 	mini: "../../static/media/sports-icons/5.png",
	// },
	{
		id: 6,
		abbrv: "NHL",
		sport: "hockey",
		display_name: "NHL",
		league_name: "nhl",
		data: { days: [] },
		reload: false,
		path: "/games?sport=nhl",
		name: "NHL",
		image: "../../static/media/sports-icons/6.png",
		mini: "../../static/media/sports-icons/6.png",
	},
	{
		id: 8,
		abbrv: "WNBA",
		sport: "basketball",
		display_name: "WNBA",
		league_name: "wnba",
		data: { days: [] },
		reload: false,
		path: "/games?sport=wnba",
		name: "WNBA",
		image: "../../static/media/sports-icons/8.png",
		mini: "../../static/media/sports-icons/8.png",
	},
	// { id: 10, abbrv: "MLS", sport: "soccer", display_name: "MLS", league_name: "MLS", data: {days: []}, reload: false },
];

export function SportProvider(props) {
	const [sportsData, dispatch] = useReducer(sportsReducer, initialSportsData);

	const getData = useCallback(async (league) => {
		let preGames,
			inGames,
			postGames,
			leagueData,
			sortedGames = [];

		if (league.reload) {
			axios
				.get(`http://site.api.espn.com/apis/site/v2/sports/${league.sport}/${league.league_name}/scoreboard`)
				.then((response) => {
					leagueData = response.data;
					inGames = response.data.events.filter((game) => {
						league.reload = true;
						return game.status.type.state === "in";
					});
					postGames = response.data.events.filter((game) => {
						return game.status.type.state === "post";
					});
					preGames = response.data.events.filter((game) => {
						return game.status.type.state === "pre";
					});

					if (inGames.length === 0) league.reload = false;
					sortedGames.push(preGames, inGames, postGames);
					leagueData.events = sortedGames.flat();
					dispatch({
						type: league.display_name,
						data: { ...leagueData, days: league.days },
						reload: league.reload,
					});

					// console.log(sortedGames.flat());
				});
		}
		// console.log("getData - league", league);
	});

	useEffect(() => {
		const timeOut = setTimeout(() => {
			try {
				sportsData.map(async (league) => {
					getData(league);
				});
			} catch (err) {
				console.log(err.message);
			}
		}, 15000);

		return () => {
			clearTimeout(timeOut);
		};
	});

	useEffect(() => {
		async function getSportsData() {
			let removeSportsData = [];
			let sportData = sportsData;

			try {
				sportData = await Promise.all(
					sportData.map(async (league) => {
						let leagueData, sortedGames, reloadData;

						await axios({
							method: "GET",
							url: `http://site.api.espn.com/apis/site/v2/sports/${league.sport}/${league.league_name}/scoreboard`,
						}).then(
							function (response) {
								if (response.data.events.length === 0) {
									removeSportsData.push(league);
								} else {
									leagueData = response.data;
									sortedGames = response.data.events.filter((game) => {
										reloadData = true;
										return game.status.type.state === "in";
									});
									sortedGames.push(
										response.data.events.filter((game) => {
											if (sortedGames.length === 0) reloadData = false;
											return game.status.type.state === "post";
										})
									);
									sortedGames.push(
										response.data.events.filter((game) => {
											return game.status.type.state === "pre";
										})
									);
									leagueData.events = sortedGames.flat();
								}
							}.bind(this)
						);
						return { ...league, data: { ...leagueData, days: [] }, reload: reloadData };
					})
				);
			} catch (err) {
				console.log(err.message);
			}
			dispatch({ type: "ALL", data: sportData });
		}
		getSportsData();
	}, []);

	// console.log("SportsContext - sportsData", sportsData);

	return (
		<SportContext.Provider value={sportsData}>
			<SportDispatch.Provider value={dispatch}>{props.children}</SportDispatch.Provider>
		</SportContext.Provider>
	);
}
