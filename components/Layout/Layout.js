import { useState, useEffect, useContext } from "react";
import { BetContext } from "../../contexts/Bets.Context.js";
import { UserContext } from "../../contexts/User.Context.js";
import axios from "axios";
// core components
import Sidebar from "../Sidebar/Sidebar.js";
import UserNavbar from "./Navbar.js";
import Footer from "./Footer.js";
import image from "../../static/img/full-screen-image-3.jpg";
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
		views: [
			{
				path: "/games?sport=ncaaf",
				name: "Football",
				image: "../../static/media/sports-icons/1.png",
				mini: "NCAAB",
			},
			{
				path: "/games?sport=nfl",
				name: "NFL",
				image: "../../static/media/sports-icons/2.png",
				mini: "NFL",
			},
			{
				path: "/games?sport=mlb",
				name: "MLB",
				image: "../../static/media/sports-icons/3.png",
				mini: "../../static/media/sports-icons/3.png",
			},
			{
				path: "/games?sport=nba",
				name: "NBA",
				image: "../../static/media/sports-icons/4.png",
				mini: "../../static/media/sports-icons/4.png",
			},
			{
				path: "/games?sport=ncaab",
				name: "Basketball",
				image: "../../static/media/sports-icons/5.png",
				mini: "../../static/media/sports-icons/5.png",
			},
			{
				path: "/games?sport=nhl",
				name: "NHL",
				image: "../../static/media/sports-icons/6.png",
				mini: "../../static/media/sports-icons/6.png",
			},
			{
				path: "/games?sport=wnba",
				name: "WNBA",
				image: "../../static/media/sports-icons/8.png",
				mini: "../../static/media/sports-icons/8.png",
			},
		],
	},
];

export default function Layout(props) {
	const user = useContext(UserContext);
	const [currentUser, setCurrentUser] = useState({
		id: user?.id,
		username: user?.username,
		image: user?.image,
		balance: user?.balance,
		openLength: user?.openBets?.length,
		acceptedLength: user?.acceptedBets?.length,
		completedLength: user?.completedBets?.length,
	});

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
