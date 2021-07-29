import React, { Component, createContext } from "react";
import axios from "axios";

export const SportContext = createContext();

export class SportProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sportsData: [
				// { sport_id: 1, sport: "football", sport_name: "NCAA Football", league_name: "college-football", data: {} },
				{ sport_id: 2, sport: "football", sport_name: "NFL", league_name: "nfl", data: {} },
				{ sport_id: 3, sport: "baseball", sport_name: "MLB", league_name: "mlb", data: {} },
				{ sport_id: 4, sport: "basketball", sport_name: "NBA", league_name: "nba", data: {} },
				{
					sport_id: 5,
					sport: "basketball",
					sport_name: "NCAA Men's Basketball",
					league_name: "mens-college-basketball",
					data: {},
				},
				{ sport_id: 6, sport: "hockey", sport_name: "NHL", league_name: "nhl", data: {} },
				{ sport_id: 8, sport: "basketball", sport_name: "WNBA", league_name: "wnba", data: {} },
				// { sport_id: 10, sport: "soccer", sport_name: "MLS", league_name: "MLS", data: {} },
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
			sportsData = await Promise.all(
				sportsData.map(async (league) => {
					let leagueData;

					response = await axios({
						method: "GET",
						url: `http://site.api.espn.com/apis/site/v2/sports/${league.sport}/${league.league_name}/scoreboard`,
					}).then(
						function (response) {
							if (response.data.events.length === 0) {
								removeSportsData.push(league);
							} else {
								leagueData = response.data;
							}
						}.bind(this)
					);
					return {
						sport_id: league.sport_id,
						sport: league.sport,
						sport_name: league.sport_name,
						league_name: league.league_name,
						data: leagueData,
					};
				})
			);
		} catch (err) {
			console.log(err.message);
		}

		this.setState({ sportsData, blockchain, fetchedSportData: true });
	}

	render() {
		return <SportContext.Provider value={{ ...this.state }}>{this.props.children}</SportContext.Provider>;
	}
}
