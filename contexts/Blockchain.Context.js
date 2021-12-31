import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import blockchainReducer from "../reducers/Blockchain.Reducer";
import { EventsFinder } from "../helpers/EventsHelper";

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
		initialized: false,
		selectedBlock: [],
	});

	useEffect(() => {
		async function getBlockchainData() {
			try {
				const getNode1 = `//localhost:3001/blockchain`;
				const res = await axios.get(getNode1);

				console.log("Blockchain - res", res);

				dispatch({
					type: "INIT",
					data: {
						...res.data,
						pendingTransactions: await EventsFinder(res.data.pendingTransactions, "blockchain"),
						initialized: true,
						selectedBlock: {
							...res.data.chain[res.data.chain.length - 1],
							transactions: await EventsFinder(
								res.data.chain[res.data.chain.length - 1].transactions,
								"blockchain"
							),
						},
					},
				});
			} catch (err) {
				console.log(err.message);
			}
		}
		getBlockchainData();
	}, []);

	return (
		<BlockchainContext.Provider value={blockchain}>
			<BlockchainDispatch.Provider value={dispatch}>{props.children}</BlockchainDispatch.Provider>
		</BlockchainContext.Provider>
	);
}
