const blockchainReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE SELECTED BLOCKS":
			return { ...state, selectedBlocks: action.blocks };
		case "INIT":
			return action.data;
		default:
			return state;
	}
};

export default blockchainReducer;
