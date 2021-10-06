const betsReducer = (state, action) => {
	switch (action.type) {
		case "ALL":
			return action.data;
		case "ADD BET":
			if (action.recipient) {
				state.pendingBets.recipientBets = [...state.pendingBets.recipientBets, action.data];
			} else {
				state.pendingBets.openBets = [...state.pendingBets.openBets, action.data];
			}
			return state;
		case "ACCEPTED BET":
			if (action.recipient) {
				state.pendingBets.recipientBets = state.pendingBets.recipientBets.filter(
					(bet) => bet.id !== action.data.id
				);
			} else {
				state.pendingBets.openBets = state.pendingBets.openBets.filter((bet) => bet.id !== action.data.id);
			}
			state.acceptedBets = [...state.acceptedBets, action.data];
			return state;
		case "COMPLETED BET":
			state.acceptedBets = state.acceptedBets.filter((bet) => bet.id !== action.data.id);
			state.completedBets = [...state.completedBets, action.data];
			return state;
		default:
			return state;
	}
};

export default betsReducer;
