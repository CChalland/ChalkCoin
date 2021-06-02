import React, { Component } from "react";
import { Table, Container, Row, Col, Image } from "react-bootstrap";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	scoreTableHelper(gameScoreCardData, sportName) {
		let title, awayPeriods, awayScore, homePeriods, homeScore;
		let index = 0;
		let linescoresHeader = gameScoreCardData.away.periods.map((period) => {
			index++;
			return <li className="list-inline-item">{index}</li>;
		});

		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED"
		) {
			title = (
				<Row className="h6">
					<Col>{gameScoreCardData.shortDetail}</Col>
				</Row>
			);
		} else if (sportName === "MLB") {
			title = (
				<Row className="h6">
					<Col>{gameScoreCardData.shortDetail}</Col>
					<Col>
						<ul className="list-inline">
							<li className="list-inline-item">{"R"}</li>
							<li className="list-inline-item">{"H"}</li>
							<li className="list-inline-item">{"E"}</li>
						</ul>
					</Col>
				</Row>
			);
			awayPeriods = gameScoreCardData.away.periods.filter((period) => {
				return;
			});
			homePeriods = gameScoreCardData.home.periods.map((period) => {
				return;
			});
		} else {
			title = (
				<Row className="h6">
					<Col>{gameScoreCardData.shortDetail}</Col>
					<Col>
						<ul className="list-inline">{linescoresHeader}</ul>
					</Col>
					<Col>{"T"}</Col>
				</Row>
			);
			awayPeriods = gameScoreCardData.away.periods.map((period) => {
				return <li className="list-inline-item">{period.value}</li>;
			});
			homePeriods = gameScoreCardData.home.periods.map((period) => {
				return <li className="list-inline-item">{period.value}</li>;
			});
			awayScore = gameScoreCardData.away.score;
			homeScore = gameScoreCardData.home.score;
		}

		return { title, awayPeriods, homePeriods, awayScore, homeScore };
	}

	renderScoreTable() {
		const { gameScoreCardData, sportName } = this.props;
		const { title, awayPeriods, awayScore, homePeriods, homeScore } = this.scoreTableHelper(
			gameScoreCardData,
			sportName
		);

		console.log(gameScoreCardData);

		return (
			<Container>
				{title}
				<Row>
					<Col md="auto">
						<Image width={40} height={40} src={gameScoreCardData.away.logo} rounded />
					</Col>
					<Col md="auto">
						<Row className="h5">{gameScoreCardData.away.name}</Row>
						<Row className="text-secondary" style={{ fontSize: 12 }}>
							{"(" +
								gameScoreCardData.away.records[0].summary +
								", " +
								gameScoreCardData.away.records[1].summary +
								" Away)"}
						</Row>
					</Col>
					<Col>
						<ul className="list-inline">{awayPeriods}</ul>
					</Col>
					<Col>{awayScore}</Col>
				</Row>
				<Row>
					<Col md="auto">
						<Image width={40} height={40} src={gameScoreCardData.home.logo} rounded />
					</Col>
					<Col md="auto">
						<Row className="h5">{gameScoreCardData.home.name}</Row>
						<Row className="text-secondary" style={{ fontSize: 12 }}>
							{"(" +
								gameScoreCardData.home.records[0].summary +
								", " +
								gameScoreCardData.home.records[1].summary +
								" Away)"}
						</Row>
					</Col>
					<Col>
						<ul className="list-inline">{homePeriods}</ul>
					</Col>
					<Col>{homeScore}</Col>
				</Row>
			</Container>
		);
	}

	render() {
		return this.renderScoreTable();
	}
}

export default GameScoreTable;
