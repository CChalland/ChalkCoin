import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BetContext } from "../contexts/Bets.Context.js";
// core components
import Sidebar from "../components/Sidebar/Sidebar.js";
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
// dinamically create dashboard routes
import routes from "./routes.js";
import image from "../static/img/full-screen-image-3.jpg";

function Admin(props) {
	const bets = useContext(BetContext);
	const [user, setUser] = useState();

	useEffect(() => {
		async function getUserData() {
			let res = await axios.get(`/api/currentUser?type=layout`);
			if (res.data && !res.data.error) {
				setUser({ ...res.data });
			}
		}
		getUserData();
	}, []);

	useEffect(() => {
		const openBets = [
			bets.userBets?.pendingBets?.openBets
				.map((sport) => {
					return sport.bets;
				})
				.flat(),
			bets.userBets?.pendingBets?.recipientBets
				.map((sport) => {
					return sport.bets;
				})
				.flat(),
		].flat();
		const acceptedBets = bets.userBets?.acceptedBets
			?.map((sport) => {
				return sport.bets;
			})
			.flat();

		setUser({ ...user, openBetsLength: openBets?.length, acceptedBetsLength: acceptedBets?.length });
	}, [bets]);

	return (
		<>
			<div className="wrapper">
				<Sidebar currentUser={user} routes={routes} image={image} background={"black"} />
				<div className="main-panel">
					<AdminNavbar />
					<div className="content">{props.children}</div>
					<AdminFooter />
					<div
						className="close-layer"
						onClick={() => document.documentElement.classList.toggle("nav-open")}
					/>
				</div>
			</div>
		</>
	);
}

export default Admin;
