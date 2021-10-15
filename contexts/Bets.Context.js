import React, { createContext, useReducer, useEffect, useContext, useState } from "react";
import axios from "axios";
import betsReducer from "../reducers/Bets.Reducer";
import { SportContext } from "../contexts/Sports.Context";

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

	console.log("in Bets.Context", bets);

	const completedGames = sportsData.map((sport) => {
		return {
			...sport,
			data: sport.data.events?.filter((game) => {
				return game.status.type.state === "post";
			}),
		};
	});
	console.log("sportsData", sportsData);
	console.log("completedGames", completedGames);

	useEffect(() => {
		async function getBetsData() {
			try {
				await axios.get("http://localhost:4000/api/bets?type=all").then((res) => {
					dispatch({ type: "INIT", bets: res.data, games: sportsData, initialized: true });
				});
			} catch (err) {
				console.log(err.message);
			}
		}

		if (!bets.initialized) {
			getBetsData();
		} else {
			console.log("useEffect - else", bets);
		}
	}, [sportsData, bets.initialized]);

	return (
		<BetContext.Provider value={bets}>
			<BetDispatch.Provider value={dispatch}>{props.children}</BetDispatch.Provider>
		</BetContext.Provider>
	);
}
