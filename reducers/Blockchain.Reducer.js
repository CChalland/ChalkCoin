const blockchainReducer = (state, action) => {
	switch (action.type) {
		case "INIT":
			return action.blockchain;
		default:
			return state;
	}
};

export default blockchainReducer;
