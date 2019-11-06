const qs = require("qs");
import React, { Component, createContext } from "react";
import axios from "axios";

export const SportContext = createContext();

export class SportProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sportsData: [
				{ sport_id: 1, sport_name: "NCAA Football", data: {} },
				{ sport_id: 2, sport_name: "NFL", data: {} },
				{ sport_id: 3, sport_name: "MLB", data: {} },
				{ sport_id: 4, sport_name: "NBA", data: {} },
				{ sport_id: 5, sport_name: "NCAA Men's Basketball", data: {} },
				{ sport_id: 6, sport_name: "NHL", data: {} },
				{ sport_id: 7, sport_name: "UFC/MMA", data: {} },
				{ sport_id: 8, sport_name: "WNBA", data: {} },
				{ sport_id: 9, sport_name: "CFL", data: {} },
				{ sport_id: 10, sport_name: "MLS", data: {} }
			],
			blockchain: {},
			fetchedSportData: false
		};
	}

	async componentDidMount() {
		let removeSportsData = [];
		let sportsData = this.state.sportsData;

		const getNode1 = `http://localhost:3001/blockchain`;
		let response = await axios.get(getNode1);
		const blockchain = response.data;

		try {
			for (let i = 0; i < sportsData.length; i++) {
				response = await axios({
					method: "GET",
					url: `https://therundown-therundown-v1.p.rapidapi.com/sports/${sportsData[i].sport_id}/events`,
					headers: {
						"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
						"x-rapidapi-key": process.env.THERUNDOWN_API_KEY_3
					},
					params: {
						include: ["all_periods", "scores"]
					},
					paramsSerializer: function(params) {
						return qs.stringify(params, { arrayFormat: "repeat" });
					}
				}).then(
					function(response) {
						if (response.data.events.length === 0) {
							removeSportsData.push(sportsData[i]);
						} else {
							sportsData[i].data = response.data;
							sportsData[i].data.events = response.data.events.sort(function(a, b) {
								return new Date(a.event_date) - new Date(b.event_date);
							});
						}
					}.bind(this)
				);
			}
		} catch (err) {
			console.log(err.message);
		}

		Array.prototype.diff = function(a) {
			return this.filter(function(i) {
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
