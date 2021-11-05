const blockchainReducer = (state, action) => {
	switch (action.type) {
		case "PENDING BET EVENTS":
			return { ...state, pendingTransactions: action.pendingBets };
		case "INIT":
			return { ...action.blockchain, initialized: action.initialized };
		default:
			return state;
	}
};

export default blockchainReducer;
