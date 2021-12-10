import { createContext, useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import userReducer from "../reducers/User.Reducer";

export const UserContext = createContext();
export const UserDispatch = createContext();
export function UserProvider(props) {
	const [user, dispatch] = useReducer(userReducer, {});

	// const getData = useCallback(async () => {
	// 	try {
	// 		const res = await axios.get("/api/currentUser?type=layout");
	// 		dispatch({ type: "INIT", data: res.data });
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// });

	// useEffect(() => {
	// 	const timeOut = setTimeout(() => {
	// 		getData();
	// 	}, 15000);

	// 	return () => {
	// 		clearTimeout(timeOut);
	// 	};
	// });

	useEffect(() => {
		async function getUserData() {
			try {
				const res = await axios.get("/api/currentUser?type=layout");
				dispatch({ type: "INIT", data: res.data });
			} catch (err) {
				console.log(err.message);
			}
		}
		getUserData();
	}, []);

	// console.log("UserContext - user", user);

	return (
		<UserContext.Provider value={user}>
			<UserDispatch.Provider value={dispatch}>{props.children}</UserDispatch.Provider>
		</UserContext.Provider>
	);
}
