const sportsReducer = (state, action) => {
	switch (action.type) {
		case "NFL":
			return state.map((sport) =>
				sport.display_name === action.type ? { ...sport, data: action.data } : sport
			);
		case "MLB":
			return state.map((sport) =>
				sport.display_name === action.type ? { ...sport, data: action.data } : sport
			);
		case "NBA":
			return state.map((sport) =>
				sport.display_name === action.type ? { ...sport, data: action.data } : sport
			);
		case "NCAA Men's Basketball":
			return state.map((sport) =>
				sport.display_name === action.type ? { ...sport, data: action.data } : sport
			);
		case "NHL":
			return state.map((sport) =>
				sport.display_name === action.type ? { ...sport, data: action.data } : sport
			);
		case "WNBA":
			return state.map((sport) =>
				sport.display_name === action.type ? { ...sport, data: action.data } : sport
			);
		case "ALL":
			return action.data;
		default:
			return state;
	}
};

export default sportsReducer;
