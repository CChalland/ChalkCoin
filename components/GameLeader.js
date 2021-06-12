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

			if (athlete.type === "pre") {
				title = "PROBABLE PITCHERS";
				player = (
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
			} else if (athlete.type === "dueUp") {
				title = `DUE UP FOR ${athlete.teamAbr}`;
				player = (
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
			} else if (athlete.type === "in") {
				player = (
					<Container>
						<Row>{athlete.title}</Row>
						<Row className="align-items-center">
							<Col md="auto">
								<Image width={45} height={40} src={athlete.headshot} roundedCircle />
							</Col>
							<Col md="auto">
								<Row className="h6">{athlete.displayName}</Row>
								<Row>{athlete.displayValue}</Row>
							</Col>
						</Row>
					</Container>
				);
			} else if (athlete.type === "completed") {
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
			}
		} else if (sportName === "NHL") {
			if (!athlete.displayValue) {
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
			}

			if (athlete.type === "pre") {
				title = athlete.title;
				player = (
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
			} else if (athlete.type === "in") {
				title = athlete.title;
				player = (
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
			} else if (athlete.type === "completed") {
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
			}
		} else if (sportName === "NFL") {
		} else {
			if (athlete.type === "pre") {
				title = athlete.title;
				player = (
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
			} else if (athlete.type === "in") {
				title = athlete.title;
				player = (
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
			} else if (athlete.type === "completed") {
				title = athlete.title;
				player = (
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
		}

		console.log(athlete);
		return { title, player };
	}

	renderGameLeaders() {
		const { gameLeadersData, sportName } = this.props;
		let gameTitle;

		let athletes = gameLeadersData.athletes.map((athlete) => {
			if (athlete) {
				const { title, player } = this.leadersHelper(athlete, sportName);
				gameTitle = title;

				return player;
			}
		});

		return (
			<Container>
				<Row>
					<h6>{gameTitle}</h6>
				</Row>

				{athletes}
			</Container>
		);
	}

	render() {
		return this.renderGameLeaders();
	}
}

export default GameLeader;
