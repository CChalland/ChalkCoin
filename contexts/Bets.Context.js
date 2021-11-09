import React, { createContext, useReducer, useEffect, useContext, useState } from "react";
import axios from "axios";
import betsReducer from "../reducers/Bets.Reducer";
import { SportContext } from "../contexts/Sports.Context";
import { EventsFinder } from "../helpers/EventsHelper";

export const BetContext = createContext();
export const BetDispatch = createContext();
export function BetProvider(props) {
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

	useEffect(() => {
		async function betEventFinder() {
			let betsData;
			try {
				const res = await axios.get("http://localhost:4000/api/bets?type=all");
				betsData = res.data;
				betsData.pendingBets.openBets = await Promise.all(
					betsData.pendingBets.openBets.map(async (league) => {
						return await EventsFinder(league, "league");
					})
				);
				betsData.pendingBets.recipientBets = await Promise.all(
					betsData.pendingBets.recipientBets.map(async (league) => {
						return await EventsFinder(league, "league");
					})
				);
				betsData.acceptedBets = await Promise.all(
					betsData.acceptedBets.map(async (league) => {
						return await EventsFinder(league, "league");
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
