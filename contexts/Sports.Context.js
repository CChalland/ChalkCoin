import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import sportsReducer from "../reducers/Sports.Reducer";
import { BetContext, BetDispatch } from "./Bets.Context";

export const SportContext = createContext();
export const SportDispatch = createContext();

export function SportProvider(props) {
	let initialSportsData = [
		// { id: 1, abbrv: "NCAAF", sport: "football", display_name: "NCAA Football", league_name: "college-football", data: {}, reload: false },
		{
			id: 2,
			abbrv: "NFL",
			sport: "football",
			display_name: "NFL",
			league_name: "nfl",
			data: {},
			reload: false,
		},
		{
			id: 3,
			abbrv: "MLB",
			sport: "baseball",
			display_name: "MLB",
			league_name: "mlb",
			data: {},
			reload: false,
		},
		{
			id: 4,
			abbrv: "NBA",
			sport: "basketball",
			display_name: "NBA",
			league_name: "nba",
			data: {},
			reload: false,
		},
		{
			id: 5,
			abbrv: "NCAAM",
			sport: "basketball",
			display_name: "NCAA Men's Basketball",
			league_name: "mens-college-basketball",
			data: {},
			reload: false,
		},
		{
			id: 6,
			abbrv: "NHL",
			sport: "hockey",
			display_name: "NHL",
			league_name: "nhl",
			data: {},
			reload: false,
		},
		{
			id: 8,
			abbrv: "WNBA",
			sport: "basketball",
			display_name: "WNBA",
			league_name: "wnba",
			data: {},
			reload: false,
		},
		// { id: 10, abbrv: "MLS", sport: "soccer", display_name: "MLS", league_name: "MLS", data: {}, reload: false },
	];
	// const [sportsData, setSportsData] = useState(initialSportsData);
	const [sportsData, dispatch] = useReducer(sportsReducer, initialSportsData);
	const [blockchain, setBlockchain] = useState({});
	const [fetchedSportData, setFetchedSportData] = useState(false);
	const betsData = useContext(BetContext);
	const betsDispatch = useContext(BetDispatch);

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
						return {
							id: league.id,
							abbrv: league.abbrv,
							sport: league.sport,
							display_name: league.display_name,
							league_name: league.league_name,
							data: leagueData,
							reload: reloadData,
						};
					})
				);
			} catch (err) {
				console.log(err.message);
			}

			dispatch({ type: "ALL", data: sportData });
			// setFetchedSportData(true);
			// setBlockchain(blockchainData);
		}

		getSportsData();
	}, [fetchedSportData]);

	return (
		<SportContext.Provider value={{ sportsData, blockchain, fetchedSportData }}>
			<SportDispatch.Provider value={dispatch}>{props.children}</SportDispatch.Provider>
		</SportContext.Provider>
	);
}
