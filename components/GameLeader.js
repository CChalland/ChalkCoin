import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	leadersHelper(athlete, sportName) {
		let title, player;

		if (sportName === "MLB") {
			if (!athlete.displayValue) {
				let wins = athlete.statistics.filter((stat) => {
					return stat.name === "wins";
				});
				let losses = athlete.statistics.filter((stat) => {
					return stat.name === "losses";
				});
				let era = athlete.statistics.filter((stat) => {
					return stat.name === "ERA";
				});
				athlete.displayValue = `(${wins[0].displayValue}-${losses[0].displayValue}, ${era[0].displayValue})`;
			}

			player = (
				<Row className="align-items-center">
					<Col md="auto">
						<Image width={45} height={40} src={athlete.headshot} roundedCircle />
					</Col>
					<Col md="auto">
						<Row className="h6">{athlete.title}</Row>
						<Row>{athlete.displayName}</Row>
					</Col>
					<Col>{athlete.displayValue}</Col>
				</Row>
			);
		} else if (!athlete.displayValue && sportName === "NHL") {
			let goals = athlete.statistics.filter((stat) => {
				return stat.name === "goals";
			});
			let assists = athlete.statistics.filter((stat) => {
				return stat.name === "assists";
			});
			let points = athlete.statistics.filter((stat) => {
				return stat.name === "points";
			});
			athlete.displayValue = `(${goals}-${assists}, ${points})`;

			player = (
				<Row className="align-items-center">
					<Col md="auto">
						<Image width={45} height={40} src={athlete.headshot} roundedCircle />
					</Col>
					<Col md="auto">
						<Row className="h6">
							{athlete.displayName}
							{`${athlete.position} - ${athlete.teamAbr}`}
						</Row>
						<Row>{athlete.displayName}</Row>
					</Col>
					<Col>{athlete.displayValue}</Col>
				</Row>
			);
		}

		console.log(athlete);
		return { title, athlete };
	}

	renderGameLeaders() {
		const { gameLeadersData, sportName } = this.props;

		let gameAthletes = gameLeadersData.athletes.map((athlete) => {
			if (athlete) {
				const { title, player } = this.leadersHelper(athlete, sportName);

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
