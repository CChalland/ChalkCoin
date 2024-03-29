import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/User.Context.js";
import { SportContext } from "../../contexts/Sports.Context.js";
// core components
import Sidebar from "./Sidebar.js";
import UserNavbar from "./Navbar.js";
import Footer from "./Footer.js";

export default function Layout(props) {
	const user = useContext(UserContext);
	const sports = useContext(SportContext);
	const [currentUser, setCurrentUser] = useState({});
	const image = "/img/sidebar.png";
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
		if (user.id)
			setCurrentUser({
				id: user.id,
				username: user.username,
				image: user.image,
				balance: user.balance,
				openLength: user.openBets?.length,
				acceptedLength: user.acceptedBets?.length,
				completedLength: user.completedBets?.length,
			});
	}, [user]);

	return (
		<div className="wrapper">
			<Sidebar currentUser={currentUser} routes={routes} image={image} background={"black"} />
			<div className="main-panel">
				<UserNavbar />
				<div className="content">{props.children}</div>
				{/* <Footer /> */}
				<div className="close-layer" onClick={() => document.documentElement.classList.toggle("nav-open")} />
			</div>
		</div>
	);
}
