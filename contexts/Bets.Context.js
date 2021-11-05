import React, { createContext, useReducer, useEffect, useContext, useState } from "react";
import axios from "axios";
import betsReducer from "../reducers/Bets.Reducer";
import { SportContext } from "../contexts/Sports.Context";

export const BetContext = createContext();
export const BetDispatch = createContext();
export function BetProvider(props) {
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
	const { sportsData } = useContext(SportContext);
	const [bets, dispatch] = useReducer(betsReducer, {
		pendingBets: { openBets: [], recipientBets: [] },
		acceptedBets: [],
		completedBets: [],
		initialized: false,
	});
	const completedAcceptedBets = bets.acceptedBets
		.map((sport) => {
			return sport.bets?.filter((bet) => {
				return bet.event?.status.type.state === "post";
			});
		})
		.flat();
	const handlingAcceptedGames = async () => {
		try {
			await axios.post("http://localhost:4000/api/completedBets", completedAcceptedBets).then((res) => {
				console.log(res.data);
				dispatch({ type: "COMPLETED BET", bets: res.data });
			});
		} catch (err) {
			console.log(err.message);
		}
	};
	const eventsFinder = async (league) => {
		let leagueBets = league.bets;
		try {
			leagueBets = await Promise.all(
				leagueBets.map(async (bet) => {
					const date = new Date(bet.details.date);
					const yyyymmdd = date.yyyymmdd();
					const leagueIndex = leagues.findIndex((league) => league.display_name === bet.details.displayName);
					let event;
					if (leagues[leagueIndex].data.some((event) => event.id === bet.details.id)) {
						event = leagues[leagueIndex].data.find((event) => event.id === bet.details.id);
					} else {
						const response = await axios.get(
							`http://site.api.espn.com/apis/site/v2/sports/${leagues[leagueIndex].sport}/${leagues[leagueIndex].league_name}/scoreboard?dates=${yyyymmdd}`
						);
						leagues[leagueIndex].data = [...leagues[leagueIndex].data, ...response.data.events];
						event = response.data.events.find((event) => event.id === bet.details.id);
					}

					return { ...bet, event };
				})
			);
		} catch (err) {
			console.log(err.message);
		}
		return { ...league, bets: leagueBets };
	};

	useEffect(() => {
		async function betEventFinder() {
			let betsData;
			try {
				const res = await axios.get("http://localhost:4000/api/bets?type=all");
				betsData = res.data;
				betsData.pendingBets.openBets = await Promise.all(
					betsData.pendingBets.openBets.map(async (league) => {
						return await eventsFinder(league);
					})
				);
				betsData.pendingBets.recipientBets = await Promise.all(
					betsData.pendingBets.recipientBets.map(async (league) => {
						return await eventsFinder(league);
					})
				);
				betsData.acceptedBets = await Promise.all(
					betsData.acceptedBets.map(async (league) => {
						return await eventsFinder(league);
					})
				);
			} catch (err) {
				console.log(err.message);
			}
			dispatch({ type: "INIT", bets: betsData, initialized: true });
		}

		async function getBetsData() {
			try {
				await axios.get("http://localhost:4000/api/bets?type=all").then((res) => {
					dispatch({ type: "INIT2", bets: res.data, games: sportsData, initialized: true });
				});
			} catch (err) {
				console.log(err.message);
			}
		}

		if (!bets.initialized) {
			betEventFinder();
			// getBetsData();
		} else {
			dispatch({ type: "GAME UPDATE", games: sportsData });
		}
	}, [sportsData, bets.initialized]);

	if (completedAcceptedBets.length > 0) {
		handlingAcceptedGames();
	}

	// console.log("in Bets.Context", bets);
	// console.log("completedAcceptedBets", completedAcceptedBets);

	return (
		<BetContext.Provider value={bets}>
			<BetDispatch.Provider value={dispatch}>{props.children}</BetDispatch.Provider>
		</BetContext.Provider>
	);
}
