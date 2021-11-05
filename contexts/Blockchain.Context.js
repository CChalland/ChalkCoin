import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import blockchainReducer from "../reducers/Blockchain.Reducer";

Date.prototype.yyyymmdd = function () {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	return [this.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("");
};

export const BlockchainContext = createContext();
export const BlockchainDispatch = createContext();
export function BlockchainProvider(props) {
	const [blockchain, dispatch] = useReducer(blockchainReducer, {
		chain: [],
		pendingTransactions: [],
		currentNodeUrl: "",
		networkNodes: [],
	});

	// console.log("blockchain in blockchain context", blockchain);

	useEffect(() => {
		async function getBlockchainData() {
			try {
				const getNode1 = `http://localhost:3001/blockchain`;
				await axios.get(getNode1).then((res) => {
					dispatch({ type: "INIT", blockchain: res.data });
				});
			} catch (err) {
				console.log(err.message);
			}
		}
		getBlockchainData();
	}, []);

	useEffect(() => {
		const leagues = [
			{
				abbrv: "NCAAF",
				sport: "football",
				display_name: "NCAA Football",
				league_name: "college-football",
			},
			{
				abbrv: "NFL",
				sport: "football",
				display_name: "NFL",
				league_name: "nfl",
			},
			{
				abbrv: "MLB",
				sport: "baseball",
				display_name: "MLB",
				league_name: "mlb",
			},
			{
				abbrv: "NBA",
				sport: "basketball",
				display_name: "NBA",
				league_name: "nba",
			},
			{
				abbrv: "NCAAB",
				sport: "basketball",
				display_name: "NCAA Men's Basketball",
				league_name: "mens-college-basketball",
			},
			{
				abbrv: "NHL",
				sport: "hockey",
				display_name: "NHL",
				league_name: "nhl",
			},
			{
				abbrv: "WNBA",
				sport: "basketball",
				display_name: "WNBA",
				league_name: "wnba",
			},
			// { id: 10, abbrv: "MLS", sport: "soccer", display_name: "MLS", league_name: "MLS", data: {}, reload: false },
		];
		async function getBetsGames() {
			let pendingBets = blockchain.pendingTransactions;
			try {
				pendingBets = await Promise.all(
					pendingBets.map(async (bet) => {
						const date = new Date(bet.details.date);
						const yyyymmdd = date.yyyymmdd();
						const betLeague = leagues.find((league) => league.display_name === bet.details.sport);
						let betEvent;
						await axios
							.get(
								`http://site.api.espn.com/apis/site/v2/sports/${betLeague.sport}/${betLeague.league_name}/scoreboard?dates=${yyyymmdd}`
							)
							.then((res) => {
								betEvent = res.data.events.find((event) => event.id === bet.details.gameId);
							});
						return { ...bet, event: betEvent };
					})
				);
			} catch (err) {
				console.log(err.message);
			}
			// console.log(pendingBets);
		}
		getBetsGames();
	}, [blockchain.pendingTransactions]);

	// console.log("blockchain provider context", blockchain);

	return (
		<BlockchainContext.Provider value={blockchain}>
			<BlockchainDispatch.Provider value={dispatch}>{props.children}</BlockchainDispatch.Provider>
		</BlockchainContext.Provider>
	);
}
