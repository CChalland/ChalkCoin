const userReducer = (state, action) => {
	switch (action.type) {
		case "INIT":
			return action.data;

		case "REWARD":
			return { ...state, balance: state.balance + action.balance };

		default:
			return state;
	}
};

export default userReducer;
