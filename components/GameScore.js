import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameScore extends Component {
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
				return (
					<Col md={2} className="mx-0 list-inline-item">
						{"OT"}
					</Col>
				);
			} else if ((sportName == "NHL" && index > 4) || index > 5) {
				let numberOT = sportName == "NHL" ? (index - 4).toString() : (index - 5).toString();
				return (
					<Col md={2} className="mx-0 list-inline-item">
						{numberOT + "OT"}
					</Col>
				);
			} else {
				return (
					<Col md={2} className="mx-0 list-inline-item">
						{index}
					</Col>
				);
			}
		});

		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED"
		) {
			title = <Col className="mx-0 pl-0">{gameScoreCardData.shortDetail}</Col>;
		} else if (sportName === "MLB") {
			title = (
				<>
					<Col md={6} className="mx-0 pl-0">
						{gameScoreCardData.detail}
					</Col>
					<Col md={2} className="mx-3 px-4">
						{"R"}
					</Col>
					<Col md={2} className="mx-0 px-0">
						{"H"}
					</Col>
					<Col md={1} className="mx-0 px-0">
						{"E"}
					</Col>
				</>
			);
			awayPeriods = gameScoreCardData.away.periods.map((period) => {
				if (period.name === "runs") {
					return (
						<Col md={2} className="mx-3 px-4 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				} else if (period.name === "errors") {
					return (
						<Col md={1} className="mx-0 px-0 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				} else {
					return (
						<Col md={2} className="mx-0 px-0 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				}
			});
			homePeriods = gameScoreCardData.home.periods.map((period) => {
				if (period.name === "runs") {
					return (
						<Col md={2} className="mx-3 px-4 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				} else if (period.name === "errors") {
					return (
						<Col md={1} className="mx-0 px-0 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				} else {
					return (
						<Col md={2} className="mx-0 px-0 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				}
			});
		} else {
			title = (
				<>
					<Col md={6} className="mx-0 pl-0">
						{gameScoreCardData.shortDetail}
					</Col>
					<Col md={4}>{linescoresHeader}</Col>
					<Col md={1}>{"T"}</Col>
				</>
			);
			awayPeriods = (
				<Col md={4}>
					{gameScoreCardData.away.periods.map((period) => {
						return (
							<Col md={2} className="mx-0 list-inline-item">
								{period.value}
							</Col>
						);
					})}
				</Col>
			);
			homePeriods = (
				<Col md={4}>
					{gameScoreCardData.home.periods.map((period) => {
						return (
							<Col md={2} className="mx-0 list-inline-item">
								{period.value}
							</Col>
						);
					})}
				</Col>
			);
			awayScore = <Col md={1}>{gameScoreCardData.away.score}</Col>;
			homeScore = <Col md={1}>{gameScoreCardData.home.score}</Col>;
		}

		return { title, awayPeriods, homePeriods, awayScore, homeScore };
	}

	renderScoreTable() {
		const { gameScoreCardData, sportName } = this.props;
		const { title, awayPeriods, awayScore, homePeriods, homeScore } = this.scoreTableHelper(
			gameScoreCardData,
			sportName
		);

		return (
			<>
				<Row className="py-2 h6 align-items-center border">{title}</Row>

				<Row className="mb-3 align-items-center">
					<Col md={2}>
						<Image width={40} height={40} src={gameScoreCardData.away.logo} rounded />
					</Col>
					<Col md={4}>
						<Row className="mb-0 h5">{gameScoreCardData.away.name}</Row>
						<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
							{"(" +
								gameScoreCardData.away.records[0].summary +
								", " +
								gameScoreCardData.away.records[1].summary +
								" Away)"}
						</Row>
					</Col>
					{awayPeriods}
					{awayScore}
				</Row>

				<Row className="my-3 align-items-center">
					<Col md={2}>
						<Image width={40} height={40} src={gameScoreCardData.home.logo} rounded />
					</Col>
					<Col md={4}>
						<Row className="mb-0 h5">{gameScoreCardData.home.name}</Row>
						<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
							{"(" +
								gameScoreCardData.home.records[0].summary +
								", " +
								gameScoreCardData.home.records[1].summary +
								" Home)"}
						</Row>
					</Col>
					{homePeriods}
					{homeScore}
				</Row>
			</>
		);
	}

	render() {
		return this.renderScoreTable();
	}
}

export default GameScore;
