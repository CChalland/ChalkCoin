const sportsReducer = (state, action) => {
	switch (action.type) {
		case "SELECTED DATE":
			return state.map((sport) =>
				sport.display_name === action.sport
					? {
							...sport,
							data: {
								...sport.data,
								days: [
									...sport.data.days.filter((day) => day.date !== action.date),
									{ date: action.date, events: action.data.events },
								],
							},
					  }
					: sport
			);
		case "NCAA Football":
			return state.map((sport) =>
				sport.display_name === action.type
					? { ...sport, data: { ...action.data, days: sport.data.days }, reload: action.reload }
					: sport
			);
		case "NFL":
			return state.map((sport) =>
				sport.display_name === action.type
					? { ...sport, data: { ...action.data, days: sport.data.days }, reload: action.reload }
					: sport
			);
		case "MLB":
			return state.map((sport) =>
				sport.display_name === action.type
					? { ...sport, data: { ...action.data, days: sport.data.days }, reload: action.reload }
					: sport
			);
		case "NBA":
			return state.map((sport) =>
				sport.display_name === action.type
					? { ...sport, data: { ...action.data, days: sport.data.days }, reload: action.reload }
					: sport
			);
		case "NCAA Men's Basketball":
			return state.map((sport) =>
				sport.display_name === action.type
					? { ...sport, data: { ...action.data, days: sport.data.days }, reload: action.reload }
					: sport
			);
		case "NHL":
			return state.map((sport) =>
				sport.display_name === action.type
					? { ...sport, data: { ...action.data, days: sport.data.days }, reload: action.reload }
					: sport
			);
		case "WNBA":
			return state.map((sport) =>
				sport.display_name === action.type
					? { ...sport, data: { ...action.data, days: sport.data.days }, reload: action.reload }
					: sport
			);
		case "ALL":
			return action.data;
		default:
			return state;
	}
};

export default sportsReducer;
