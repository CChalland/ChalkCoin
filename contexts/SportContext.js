const qs = require("qs");
import React, { Component, createContext } from "react";
import axios from "axios";

export const SportContext = createContext();

export class SportProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sportsData: [
				// { sport_id: 1, sport_name: "football", league_name: "college-football", data: {} },
				{ sport_id: 2, sport_name: "football", league_name: "nfl", data: {} },
				{ sport_id: 3, sport_name: "baseball", league_name: "mlb", data: {} },
				{ sport_id: 4, sport_name: "basketball", league_name: "nba", data: {} },
				{ sport_id: 5, sport_name: "basketball", league_name: "mens-college-basketball", data: {} },
				{ sport_id: 6, sport_name: "hockey", league_name: "nhl", data: {} },
				{ sport_id: 8, sport_name: "basketball", league_name: "wnba", data: {} },
				// { sport_id: 10, sport_name: "soccer", league_name: "MLS", data: {} },
			],
			blockchain: {},
			fetchedSportData: false,
		};
	}

	async componentDidMount() {
		let removeSportsData = [];
		let sportsData = this.state.sportsData;

		const getNode1 = `http://localhost:3001/blockchain`;
		let response = await axios.get(getNode1);
		const blockchain = response.data;

		try {
			await sportsData.map((league) => {
				let leagueData;

				response = axios({
					method: "GET",
					url: `http://site.api.espn.com/apis/site/v2/sports/${league.league_name}/${league.sport_name}/scoreboard`,
				}).then(
					function (response) {
						if (response.data.events.length === 0) {
							removeSportsData.push(sportsData[i]);
						} else {
							leagueData = response.data;
						}
					}.bind(this)
				);

				return {
					sport_id: league.sport_id,
					sport_name: league.sport_name,
					data: leagueData,
				};
			});
		} catch (err) {
			console.log(err.message);
		}

		Array.prototype.diff = function (a) {
			return this.filter(function (i) {
				return a.indexOf(i) < 0;
			});
		};

		sportsData = sportsData.diff(removeSportsData);

		this.setState({ sportsData, blockchain, fetchedSportData: true });
	}

	render() {
		return <SportContext.Provider value={{ ...this.state }}>{this.props.children}</SportContext.Provider>;
	}
}
