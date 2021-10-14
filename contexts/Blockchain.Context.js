import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import blockchainReducer from "../reducers/Blockchain.Reducer";

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

	useEffect(() => {}, []);

	// console.log("blockchain provider context", blockchain);

	return (
		<BlockchainContext.Provider value={blockchain}>
			<BlockchainDispatch.Provider value={dispatch}>{props.children}</BlockchainDispatch.Provider>
		</BlockchainContext.Provider>
	);
}
