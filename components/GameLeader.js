import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	gameLeadersHelper(gameLeadersData, sportName) {
		let athletes = gameLeadersData.athletes;

		console.log(gameLeadersData);
		return athletes;
	}

	renderGameLeaders() {
		const { gameLeadersData, sportName } = this.props;
		const athletes = this.gameLeadersHelper(gameLeadersData, sportName);

		let gameAthletes = athletes.map((athlete) => {
			// console.log(athlete);

			if (null) {
				return (
					<Row className="align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="h6">{athlete.athlete.displayName}</Row>
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
