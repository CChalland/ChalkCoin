import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import userReducer from "../reducers/User.Reducer";

export const UserContext = createContext();
export const UserDispatch = createContext();
export function UserProvider(props) {
	const [user, dispatch] = useReducer(userReducer, { id: 0 });

	useEffect(() => {
		async function getUserData() {
			try {
			} catch (err) {
				console.log(err.message);
			}
		}
		getUserData();
	}, []);

	return (
		<UserContext.Provider value={user}>
			<UserDispatch.Provider value={dispatch}>{props.children}</UserDispatch.Provider>
		</UserContext.Provider>
	);
}
