import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import betsReducer from "../reducers/Bets.Reducer";

export const BetContext = createContext();
export const BetDispatch = createContext();
export function BetProvider(props) {
	const [betsData, dispatch] = useReducer(betsReducer, {
		pendingBets: { openBets: [], recipientBets: [] },
		acceptedBets: [],
		completedBets: [],
	});

	useEffect(() => {
		async function getBetsData() {
			let allBets;
			try {
				await axios.get("http://localhost:4000/api/bets?type=all").then((res) => {
					allBets = res.data;
				});
			} catch (err) {
				console.log(err.message);
			}

			dispatch({ type: "ALL", data: allBets });
		}
		getBetsData();
	}, []);
	return (
		<BetContext.Provider value={betsData}>
			<BetDispatch.Provider value={dispatch}>{props.children}</BetDispatch.Provider>
		</BetContext.Provider>
	);
}
