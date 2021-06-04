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
			if ((sportName == "NHL" && index == 4) || index == 5) {
				return <li className="list-inline-item">{"OT"}</li>;
			} else if ((sportName == "NHL" && index > 4) || index > 5) {
				let numberOT = sportName == "NHL" ? (index - 4).toString() : (index - 5).toString();
				return <li className="list-inline-item">{numberOT + "OT"}</li>;
			} else {
				return <li className="list-inline-item">{index}</li>;
			}
		});

		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED"
		) {
			title = (
				<Row className="h6 align-items-center">
					<Col>{gameScoreCardData.shortDetail}</Col>
				</Row>
			);
		} else if (sportName === "MLB") {
			title = (
				<Row className="h6 align-items-center">
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
			awayPeriods = gameScoreCardData.away.periods.map((period) => {
				if (period.abbreviation === "R") {
					return <li className="list-inline-item">{period.displayValue}</li>;
				} else if (period.abbreviation === "H") {
					return <li className="list-inline-item">{period.displayValue}</li>;
				} else if (period.abbreviation === "E") {
					return <li className="list-inline-item">{period.displayValue}</li>;
				}
			});
			homePeriods = gameScoreCardData.home.periods.map((period) => {
				if (period.abbreviation === "R") {
					return <li className="list-inline-item">{period.displayValue}</li>;
				} else if (period.abbreviation === "H") {
					return <li className="list-inline-item">{period.displayValue}</li>;
				} else if (period.abbreviation === "E") {
					return <li className="list-inline-item">{period.displayValue}</li>;
				}
			});
		} else {
			title = (
				<Row className="h6 align-items-center">
					<Col md={7}>{gameScoreCardData.shortDetail}</Col>
					<Col md={4}>
						<ul className="list-inline">{linescoresHeader}</ul>
					</Col>
					<Col md={1}>{"T"}</Col>
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
				<Row className="align-items-center">
					<Col md="auto">
						<Image width={40} height={40} src={gameScoreCardData.away.logo} rounded />
					</Col>
					<Col md={5}>
						<Row className="h5">{gameScoreCardData.away.name}</Row>
						<Row className="text-secondary" style={{ fontSize: 12 }}>
							{"(" +
								gameScoreCardData.away.records[0].summary +
								", " +
								gameScoreCardData.away.records[1].summary +
								" Away)"}
						</Row>
					</Col>
					<Col md={4}>
						<ul className="list-inline">{awayPeriods}</ul>
					</Col>
					<Col md={1}>{awayScore}</Col>
				</Row>
				<Row className="align-items-center">
					<Col md="auto">
						<Image width={40} height={40} src={gameScoreCardData.home.logo} rounded />
					</Col>
					<Col md={5}>
						<Row className="h5">{gameScoreCardData.home.name}</Row>
						<Row className="text-secondary" style={{ fontSize: 12 }}>
							{"(" +
								gameScoreCardData.home.records[0].summary +
								", " +
								gameScoreCardData.home.records[1].summary +
								" Home)"}
						</Row>
					</Col>
					<Col md={4}>
						<ul className="list-inline">{homePeriods}</ul>
					</Col>
					<Col md={1}>{homeScore}</Col>
				</Row>
			</Container>
		);
	}

	render() {
		return this.renderScoreTable();
	}
}

export default GameScoreTable;
