/*!

=========================================================
* BEToken - v1.0.0
=========================================================

* Coded by Cole Challand

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "../views/Dashboard.js";
import TodayGames from "../views/TodayGames";

var routes = [
	{
		path: "/bet",
		name: "Bets",
		icon: "nc-icon nc-chart-pie-35",
	},
	{
		collapse: true,
		path: "/games",
		name: "Games",
		state: "openGames",
		icon: "nc-icon nc-app",
		views: [
			{
				path: "/games?sport=nfl",
				name: "NFL",
			},
			{
				path: "/games?sport=mlb",
				name: "MLB",
			},
			{
				path: "/games?sport=nba",
				name: "NBA",
			},
			{
				path: "/games?sport=ncaam",
				name: "NCAA Men's Basketball",
			},
			{
				path: "/games?sport=nhl",
				name: "NHL",
			},
			{
				path: "/games?sport=wnba",
				name: "WNBA",
			},
		],
	},
];
export default routes;
