import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	gameLeadersHelper() {}

	renderGameLeaders() {
		const { gameLeadersData, sportName } = this.props;

		console.log(gameLeadersData.athletes);

		let gameAthletes = gameLeadersData.athletes.map((athlete) => {
			// console.log(athlete);

			if (athlete) {
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
		// console.log(gameLeadersData);
		// console.log(athletes);
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
