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
			if (athlete && !athlete.displayValue && athlete.statistics.length > 0) {
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

			if (athlete && athlete.type === "pre") {
				title = "PROBABLE PITCHERS";
				player = (
					<Row className="mb-3 align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="mb-0">
								<Col md="auto" className="px-0">
									{athlete.displayName}
								</Col>
								<Col md="auto" className="px-2 text-secondary">
									{athlete.team}
								</Col>
							</Row>
							<Row className="mb-0 text-secondary">{athlete.displayValue}</Row>
						</Col>
					</Row>
				);
			} else if (athlete && athlete.type === "dueUp") {
				title = `DUE UP FOR ${athlete.team.toUpperCase()}`;
				player = (
					<Row className="mb-3 align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="mb-0 h6">{athlete.displayName}</Row>
							<Row className="mb-0 text-secondary">{athlete.displayValue}</Row>
						</Col>
					</Row>
				);
			} else if (athlete && athlete.type === "in") {
				player = (
					<>
						<Row className="mt-2 py-1 text-secondary">{athlete.title}</Row>
						<Row className="mb-0 align-items-center">
							<Col md="auto">
								<Image width={45} height={40} src={athlete.headshot} roundedCircle />
							</Col>
							<Col md="auto">
								<Row className="mb-0 h6">{athlete.displayName}</Row>
								<Row className="mb-0 text-secondary">{athlete.displayValue}</Row>
							</Col>
						</Row>
					</>
				);
			} else if (athlete && athlete.type === "completed") {
				player = (
					<Row className="mb-3 align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="mb-0 h6 text-secondary">{athlete.title}</Row>
							<Row className="mb-0">{athlete.displayName}</Row>
						</Col>
						<Col>{athlete.displayValue}</Col>
					</Row>
				);
			} else {
				title = "PROBABLE PITCHERS";
				player = (
					<Row className="mb-3 align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={null} roundedCircle />
						</Col>
						<Col md="auto">{"Undecided"}</Col>
					</Row>
				);
			}
		} else if (athlete && sportName === "NHL") {
			if (!athlete.displayValue && athlete.position === "G") {
				let saves = athlete.statistics.filter((stat) => {
					return stat.name === "saves";
				});
				let savesPrecent = athlete.statistics.filter((stat) => {
					return stat.name === "savePct";
				});
				athlete.displayValue = `${saves[0].displayValue} SV. ${savesPrecent[0].displayValue}`;
			} else if (!athlete.displayValue) {
				let goals = athlete.statistics.filter((stat) => {
					return stat.name === "goals";
				});
				let assists = athlete.statistics.filter((stat) => {
					return stat.name === "assists";
				});
				let plusMinus = athlete.statistics.filter((stat) => {
					return stat.name === "plusMinus";
				});
				athlete.displayValue = `${goals[0].displayValue} G, ${assists[0].displayValue} A, ${plusMinus[0].displayValue}`;
			}

			if (athlete.type === "pre" || athlete.type === "in") {
				const filler = athlete.type === "pre" ? "PTS" : null;
				title = athlete.title;
				player = (
					<Row className="mb-3 align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="mb-0 h6">
								<Col md="auto" className="px-0">
									{athlete.displayName}
								</Col>
								<Col md="auto" className="px-2 text-secondary">{`${athlete.position} - ${athlete.team}`}</Col>
							</Row>
							<Row className="mb-0 text-secondary">{`${athlete.displayValue} ${filler}`}</Row>
						</Col>
					</Row>
				);
			} else if (athlete.type === "completed") {
				player = (
					<Row className="mb-3 align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="mb-0 h6">
								<Col md="auto" className="px-0">
									{athlete.displayName}
								</Col>
								<Col md="auto" className="px-2 text-secondary">{`${athlete.position} - ${athlete.team}`}</Col>
							</Row>
							<Row className="mb-0 text-secondary">{`${athlete.displayValue}`}</Row>
						</Col>
					</Row>
				);
			}
		} else if (athlete && sportName === "NFL") {
		} else if (athlete) {
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
		return { title, player };
	}

	renderGameLeaders() {
		const { gameLeadersData, sportName } = this.props;
		let gameTitle;

		let athletes = gameLeadersData.athletes.map((athlete) => {
			console.log(athlete);
			const { title, player } = this.leadersHelper(athlete, sportName);
			gameTitle = title;

			return player;
		});

		return (
			<Container>
				<Row className="mt-2 py-1 text-secondary">
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
