const blockchainReducer = (state, action) => {
	switch (action.type) {
		case "ADD PENDING":
			const notIncluded = action.bets
				.filter((n) => !state.pendingTransactions.includes(n))
				.map((bet) => {
					const winner = bet.event.competitions[0].competitors[0].winner
						? bet.event.competitions[0].competitors[0].team.shortDisplayName
						: bet.event.competitions[0].competitors[1].team.shortDisplayName;
					return {
						amount: bet.amount,
						details: { ...bet.details, betId: bet.id },
						event: bet.event,
						recipient:
							bet.details.winner === winner ? bet.accepter.walletAddress : bet.requester.walletAddress,
						sender: bet.details.winner === winner ? bet.requester.walletAddress : bet.accepter.walletAddress,
						transactionId: bet.transactionId,
					};
				});
			if (notIncluded) {
				return { ...state, pendingTransactions: [...state.pendingTransactions, ...notIncluded] };
			} else return state;

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
