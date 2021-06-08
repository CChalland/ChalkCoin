import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	gameLeadersHelper(gameLeadersData, sportName) {
		const homeLeader = gameLeadersData.home.leaders
			? gameLeadersData.home.leaders[gameLeadersData.home.leaders.length - 1].leaders[0]
			: null;
		const awayLeader = gameLeadersData.away.leaders
			? gameLeadersData.away.leaders[gameLeadersData.away.leaders.length - 1].leaders[0]
			: null;
		const homeProbables = gameLeadersData.home.probables ? gameLeadersData.home.probables[0] : null;
		const awayProbables = gameLeadersData.away.probables ? gameLeadersData.away.probables[0] : null;
		const featuredAthletes =
			sportName === null
				? gameLeadersData.status.featuredAthletes.splice(2, 5)
				: gameLeadersData.status.featuredAthletes;

		let athletes = [];

		if (
			(gameLeadersData.status.type.name === "STATUS_SCHEDULED" ||
				gameLeadersData.status.type.name === "STATUS_POSTPONED") &&
			sportName === "MLB"
		) {
			athletes.push(awayProbables, homeProbables);
		} else if (
			gameLeadersData.status.type.name === "STATUS_SCHEDULED" ||
			gameLeadersData.status.type.name === "STATUS_POSTPONED"
		) {
			athletes.push(awayLeader, homeLeader);
		} else if (
			gameLeadersData.status.type.description === "In Progress" ||
			gameLeadersData.status.type.description === "End of Period" ||
			gameLeadersData.status.type.description === "Halftime"
		) {
			athletes.push(awayLeader, homeLeader);
		} else if (gameLeadersData.status.type.completed && (sportName === "NHL" || sportName === "MLB")) {
			athletes = featuredAthletes;
		} else if (gameLeadersData.status.type.completed) {
			athletes.push(awayLeader, homeLeader);
		}
		return { homeLeader, awayLeader, athletes };
	}

	renderGameLeaders() {
		const { gameLeadersData, sportName } = this.props;
		const { homeLeader, awayLeader, athletes } = this.gameLeadersHelper(gameLeadersData, sportName);

		let gameAthletes = athletes.map((athlete) => {
			console.log(athlete);

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
		console.log(gameLeadersData);
		console.log(athletes);

		if (homeLeader && awayLeader) {
			return (
				<Container>
					<Row>
						<h6>{"Players to Watch"}</h6>
					</Row>

					{gameAthletes}
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
