import { useState, useEffect, useContext } from "react";
import { BetContext } from "../../contexts/Bets.Context.js";
import { UserContext } from "../../contexts/User.Context.js";
import { SportContext } from "../../contexts/Sports.Context.js";
import axios from "axios";
// core components
import Sidebar from "../Sidebar/Sidebar.js";
import UserNavbar from "./Navbar.js";
import Footer from "./Footer.js";
import image from "../../static/img/full-screen-image-3.jpg";

export default function Layout(props) {
	const user = useContext(UserContext);
	const sports = useContext(SportContext);
	const [currentUser, setCurrentUser] = useState({
		id: user?.id,
		username: user?.username,
		image: user?.image,
		balance: user?.balance,
		openLength: user?.openBets?.length,
		acceptedLength: user?.acceptedBets?.length,
		completedLength: user?.completedBets?.length,
	});
	let routes = [
		{
			path: "/bets",
			name: "Bets",
			icon: "nc-icon nc-money-coins",
		},
		{
			path: "/blockchain",
			name: "Blockchain",
			icon: "nc-icon nc-bank",
		},
		{
			collapse: true,
			path: "/games",
			name: "Games",
			state: "openGames",
			icon: "",
			views: sports.map((sport) => {
				return { path: sport.path, name: sport.name, image: sport.image, mini: sport.mini };
			}),
		},
	];

	useEffect(() => {
		setCurrentUser({
			id: user?.id,
			username: user?.username,
			image: user?.image,
			balance: user?.balance,
			openBetsLength: user?.openBets?.length,
			acceptedBetsLength: user?.acceptedBets?.length,
			completedLength: user?.completedBets?.length,
		});
	}, [user]);

	// console.log("Layout - user", user);
	// console.log("Layout - currentUser", currentUser);

	return (
		<div className="wrapper">
			<Sidebar currentUser={currentUser} routes={routes} image={image} background={"black"} />
			<div className="main-panel">
				<UserNavbar />
				<div className="content">{props.children}</div>
				<Footer />
				<div className="close-layer" onClick={() => document.documentElement.classList.toggle("nav-open")} />
			</div>
		</div>
	);
}
