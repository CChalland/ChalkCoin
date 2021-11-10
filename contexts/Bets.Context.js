import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import betsReducer from "../reducers/Bets.Reducer";
import { EventsFinder } from "../helpers/EventsHelper";
import { BlockchainDispatch } from "./Blockchain.Context";

export const BetContext = createContext();
export const BetDispatch = createContext();
export function BetProvider(props) {
	const blockchainDispatch = useContext(BlockchainDispatch);
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
		betEventFinder();
	}, []);

	useEffect(() => {
		async function handlingAcceptedGames() {
			let betsData;
			try {
				const res = await axios.post("http://localhost:4000/api/completedBets", completedAcceptedBets);
				betsData = res.data.map((bet) => {
					const event = completedAcceptedBets.find((acptBet) => acptBet.event.id === bet.details.gameId);
					return { ...bet, event: event.event };
				});
				dispatch({ type: "COMPLETED BET", bets: betsData });
				blockchainDispatch({ type: "ADD PENDING", bets: betsData });
			} catch (err) {
				console.log(err.message);
			}
		}
		if (completedAcceptedBets.length > 0) handlingAcceptedGames();
	}, [completedAcceptedBets]);

	// useEffect(() => {
	// 	if (bets.initialized) dispatch({ type: "GAME UPDATE", games: sportsData });
	// }, [sportsData]);

	// console.log("in Bets.Context", bets);
	// console.log("completedAcceptedBets", completedAcceptedBets);

	return (
		<BetContext.Provider value={bets}>
			<BetDispatch.Provider value={dispatch}>{props.children}</BetDispatch.Provider>
		</BetContext.Provider>
	);
}
