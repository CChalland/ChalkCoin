const blockchainReducer = (state, action) => {
	switch (action.type) {
		case "ADD BLOCK":
			return {
				...state,
				chain: [...state.chain, action.block],
				pendingTransactions: [action.mineTransaction],
			};

		case "UPDATE SELECTED BLOCK":
			return { ...state, selectedBlock: action.block };

		case "INIT":
			return action.data;

		default:
			return state;
	}
};

export default blockchainReducer;
