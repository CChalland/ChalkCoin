/*!
=========================================================
* BEToken - v1.0.0
=========================================================

* Coded by Cole Challand

=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

var routes = [
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
export default routes;
