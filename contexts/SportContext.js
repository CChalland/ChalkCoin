const qs = require("qs");
import React, { Component, createContext } from "react";
import axios from "axios";

export const SportContext = createContext();

export class SportProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sportsData: [
				{ sport_id: 2, sport_name: "NFL", data: {} },
				{ sport_id: 6, sport_name: "NHL", data: {} },
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
			response = await axios({
				method: "GET",
				url: `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`,
			}).then(
				function (response) {
					if (response.data.events.length === 0) {
						removeSportsData.push(sportsData[0]);
					} else {
						sportsData[0].data = response.data;
						console.log(response.data);
					}
				}.bind(this)
			);

			for (let i = 0; i < sportsData.length; i++) {}
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
