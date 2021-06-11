import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	gameLeadersHelper(gameLeadersData, sportName) {
		let athletes = gameLeadersData.athletes;

		// ** Add conditional when athlete.displayValue is undefined **
		// let wins = athlete.statistics.filter((stat) => {
		// 	return stat.name === "wins";
		// });
		// let losses = athlete.statistics.filter((stat) => {
		// 	return stat.name === "losses";
		// });
		// let era = athlete.statistics.filter((stat) => {
		// 	return stat.name === "ERA";
		// });

		console.log(gameLeadersData);
		return athletes;
	}

	renderGameLeaders() {
		const { gameLeadersData, sportName } = this.props;
		const athletes = this.gameLeadersHelper(gameLeadersData, sportName);

		let gameAthletes = athletes.map((athlete) => {
			// console.log(athlete);

			if (athlete) {
				return (
					<Row className="align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="h6">{athlete.displayName}</Row>
							<Row>{athlete.displayValue}</Row>
						</Col>
					</Row>
				);
			}
		});

		return (
			<Container>
				<Row>
					<h6>{"Players to Watch"}</h6>
				</Row>

				{gameAthletes}
			</Container>
		);
	}

	render() {
		return this.renderGameLeaders();
	}
}

export default GameLeader;
