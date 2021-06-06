import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	gameLeadersHelper(gameLeadersData) {
		const homeLeader = gameLeadersData.home.leaders
			? gameLeadersData.home.leaders[gameLeadersData.home.leaders.length - 1].leaders[0]
			: null;
		const awayLeader = gameLeadersData.away.leaders
			? gameLeadersData.away.leaders[gameLeadersData.away.leaders.length - 1].leaders[0]
			: null;
		let featuredAthletes = gameLeadersData.featuredAthletes;

		return { homeLeader, awayLeader, featuredAthletes };
	}

	renderGameLeaders() {
		const { gameLeadersData } = this.props;
		const { homeLeader, awayLeader, featuredAthletes } = this.gameLeadersHelper(gameLeadersData);

		console.log(gameLeadersData);
		console.log(awayLeader);
		console.log(homeLeader);

		if (homeLeader && awayLeader) {
			return (
				<Container>
					<Row>
						<h6>{"Players to Watch"}</h6>
					</Row>

					<Row className="align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={awayLeader.athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="h6">{awayLeader.athlete.displayName}</Row>
							<Row>{awayLeader.displayValue}</Row>
						</Col>
					</Row>

					<Row className="align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={homeLeader.athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="h6">{homeLeader.athlete.displayName}</Row>
							<Row>{homeLeader.displayValue}</Row>
						</Col>
					</Row>
				</Container>
			);
		} else {
			return null;
		}
	}

	render() {
		return this.renderGameLeaders();
	}
}

export default GameLeader;
