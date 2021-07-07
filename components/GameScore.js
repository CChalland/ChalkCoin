import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameScore extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	scoreTableHelper(gameScoreCardData, sportName) {
		let title, awayPeriods, awayScore, homePeriods, homeScore, awayFinalStyle, homeFinalStyle;
		const titleStyle = gameScoreCardData.status.type.state === "in" ? "text-danger" : "";

		let index = 0;
		const linescoresHeader = gameScoreCardData.away.periods.map((period) => {
			index++;
			if ((sportName == "NHL" && index == 4) || index == 5) {
				return (
					<Col md={2} className="mx-0 list-inline-item text-center">
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
					<Col md={2} className="mx-0 list-inline-item text-center">
						{index}
					</Col>
				);
			}
		});

		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED" ||
			gameScoreCardData.status.type.name === "STATUS_DELAYED"
		) {
			title = <Col className="mx-0 pl-0">{gameScoreCardData.shortDetail}</Col>;
		} else if (sportName === "MLB") {
			let awayRuns, homeRuns;

			title = (
				<>
					<Col md={6} className={`mx-0 pl-0 ${titleStyle} h6`}>
						{gameScoreCardData.detail}
					</Col>
					<Col md={1} className="mx-2 px-5 h6">
						{"R"}
					</Col>
					<Col md={1} className="mx-1 px-0 h6">
						{"H"}
					</Col>
					<Col md={1} className="mx-0 px-2 h6">
						{"E"}
					</Col>
				</>
			);
			awayPeriods = gameScoreCardData.away.periods.map((period) => {
				if (period.name === "runs") {
					awayRuns = period.displayValue;
					return (
						<Col md={1} className="mx-2 px-5 list-inline-item h5">
							{period.displayValue}
						</Col>
					);
				} else if (period.name === "errors") {
					return (
						<Col md={1} className="mx-0 px-2 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				} else {
					return (
						<Col md={1} className="mx-1 px-0 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				}
			});
			homePeriods = gameScoreCardData.home.periods.map((period) => {
				if (period.name === "runs") {
					homeRuns = period.displayValue;
					return (
						<Col md={1} className="mx-2 px-5 list-inline-item h5">
							{period.displayValue}
						</Col>
					);
				} else if (period.name === "errors") {
					return (
						<Col md={1} className="mx-0 px-2 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				} else {
					return (
						<Col md={1} className="mx-1 px-0 list-inline-item h6">
							{period.displayValue}
						</Col>
					);
				}
			});

			if (gameScoreCardData.status.type.state === "post") {
				awayFinalStyle = awayRuns > homeRuns ? "winIndicatorMLB" : "text-secondary";
				homeFinalStyle = homeRuns > awayRuns ? "winIndicatorMLB" : "text-secondary";
			}
		} else {
			title = (
				<>
					<Col md={6} className={`mx-0 pl-0 ${titleStyle} h6`}>
						{gameScoreCardData.shortDetail}
					</Col>
					<Col md={4} className="h6">
						{linescoresHeader}
					</Col>
					<Col md={1} className="mx-3 h6 text-center">
						{"T"}
					</Col>
				</>
			);
			awayPeriods = (
				<Col md={4}>
					{gameScoreCardData.away.periods.map((period) => {
						return (
							<Col md={2} className="mx-0 list-inline-item h6 text-center">
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
							<Col md={2} className="mx-0 list-inline-item h6 text-center">
								{period.value}
							</Col>
						);
					})}
				</Col>
			);
			awayScore = (
				<Col md={1} className="h5">
					{gameScoreCardData.away.score}
				</Col>
			);
			homeScore = (
				<Col md={1} className="h5">
					{gameScoreCardData.home.score}
				</Col>
			);

			if (gameScoreCardData.status.type.state === "post") {
				awayFinalStyle =
					gameScoreCardData.away.score > gameScoreCardData.home.score ? "winIndicator" : "text-secondary";
				homeFinalStyle =
					gameScoreCardData.home.score > gameScoreCardData.away.score ? "winIndicator" : "text-secondary";
			}
		}

		return { title, awayPeriods, homePeriods, awayScore, homeScore, awayFinalStyle, homeFinalStyle };
	}

	renderScoreTable() {
		const { gameScoreCardData, sportName } = this.props;
		const { title, awayPeriods, awayScore, homePeriods, homeScore, awayFinalStyle, homeFinalStyle } =
			this.scoreTableHelper(gameScoreCardData, sportName);

		return (
			<>
				<Row className="py-2 h6 align-items-center border">{title}</Row>

				<Row className={`my-3 align-items-center ${awayFinalStyle}`}>
					<Col md={2} className="px-4">
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
					<span className={awayFinalStyle}></span>
				</Row>

				<Row className={`mt-4 mb-3 align-items-center ${homeFinalStyle}`}>
					<Col md={2} className="px-4">
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
					<span className={homeFinalStyle}></span>
				</Row>
			</>
		);
	}

	render() {
		return this.renderScoreTable();
	}
}

export default GameScore;
