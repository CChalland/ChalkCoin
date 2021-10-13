import React, { createContext, useReducer, useEffect, useContext } from "react";
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
		blockchain: {},
	});

	console.log("sports data in bet context", sportsData);

	useEffect(() => {
		async function getBetsData() {
			const getNode1 = `http://localhost:3001/blockchain`;
			let response = await axios.get(getNode1);
			const blockchainData = response.data;

			try {
				await axios.get("http://localhost:4000/api/bets?type=all").then((res) => {
					dispatch({ type: "INIT", bets: res.data, blockchain: blockchainData });
				});
			} catch (err) {
				console.log(err.message);
			}
		}
		getBetsData();
	}, []);

	useEffect(() => {}, [sportsData]);

	return (
		<BetContext.Provider value={bets}>
			<BetDispatch.Provider value={dispatch}>{props.children}</BetDispatch.Provider>
		</BetContext.Provider>
	);
}
