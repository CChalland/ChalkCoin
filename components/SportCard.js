import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "../routes";
import GameScore from "./GameScore";
import GamePlay from "./GamePlay";
import GameLeader from "./GameLeader";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";
import axios from "axios";

class SportCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			activeIndex: 0,
			sportData: this.props.sportData.data.events,
			sportName: this.props.sportName,
			reloadData: false,
		};
	}

	componentDidMount() {
		const { sportData } = this.props;
		let fetchedSportData,
			reloadData = false;

		fetchedSportData = sportData.data.events.filter((game) => {
			reloadData = true;
			return game.status.type.state === "in";
		});
		fetchedSportData.push(
			sportData.data.events.filter((game) => {
				if (fetchedSportData.length === 0) reloadData = false;
				return game.status.type.state === "post";
			})
		);
		fetchedSportData.push(
			sportData.data.events.filter((game) => {
				return game.status.type.state === "pre";
			})
		);

		this.setState({ sportData: fetchedSportData.flat(), reloadData });
	}

	async componentDidUpdate() {
		const { sportData } = this.props;
		let reloadData = this.state.reloadData;
		let fetchedSportData;

		if (reloadData) {
			await axios
				.get(
					`http://site.api.espn.com/apis/site/v2/sports/${sportData.sport}/${sportData.league_name}/scoreboard`
				)
				.then((response) => {
					fetchedSportData = response.data.events.filter((game) => {
						reloadData = true;
						return game.status.type.state === "in";
					});
					fetchedSportData.push(
						response.data.events.filter((game) => {
							if (fetchedSportData.length < 1) reloadData = false;
							return game.status.type.state === "post";
						})
					);
					fetchedSportData.push(
						response.data.events.filter((game) => {
							return game.status.type.state === "pre";
						})
					);
					setTimeout(() => {
						this.setState({ sportData: fetchedSportData.flat(), reloadData });
					}, 15000);

					console.log(fetchedSportData.flat());
				});
		}
	}

	renderGamesCards(sportId) {
		const { sportName, reloadData } = this.state;
		let sportData;
		if (reloadData) {
			sportData = this.state.sportData;
		} else {
			sportData = this.props.sportData.data.events;
		}

		let gameItems = sportData.map((game) => {
			// console.log(game);
			return (
				<Container>
					<Row className="mt-3 mb-3">
						<Col sm={4} className="border rounded">
							<GameScore
								key={game.uid.toString()}
								gameScoreCardData={GameScoreHelper(game, sportName)}
								sportName={sportName}
							/>
						</Col>

						<Col sm={3} className="border rounded">
							<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
						</Col>

						<Col sm={3} className="border rounded">
							<GameLeader gameLeadersData={GameLeadersHelper(game, sportName)} sportName={sportName} />
						</Col>
					</Row>
				</Container>
			);
		});

		return gameItems;
	}

	render() {
		return this.renderGamesCards(this.props.sportIndex);
	}
}

export default SportCard;
