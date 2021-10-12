import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import betsReducer from "../reducers/Bets.Reducer";

export const BetContext = createContext();
export const BetDispatch = createContext();
export function BetProvider(props) {
	const [bets, dispatch] = useReducer(betsReducer, {
		pendingBets: { openBets: [], recipientBets: [] },
		acceptedBets: [],
		completedBets: [],
		blockchain: {},
	});

	useEffect(() => {
		async function getBetsData() {
			const getNode1 = `http://localhost:3001/blockchain`;
			let response = await axios.get(getNode1);
			const blockchainData = response.data;

			try {
				await axios.get("http://localhost:4000/api/bets?type=all").then((res) => {
					dispatch({ type: "ALL", data: res.data, blockchain: blockchainData });
				});
			} catch (err) {
				console.log(err.message);
			}
		}
		getBetsData();
	}, []);
	return (
		<BetContext.Provider value={bets}>
			<BetDispatch.Provider value={dispatch}>{props.children}</BetDispatch.Provider>
		</BetContext.Provider>
	);
}
