import React from "react";
import { Row, Col, Image } from "react-bootstrap";

function GameScore(props) {
	const scoreTableHelper = (gameScoreCardData, sportName) => {
		let title, awayPeriods, awayScore, homePeriods, homeScore, awayFinalStyle, homeFinalStyle;
		const titleStyle = gameScoreCardData.status.type.state === "in" ? "text-danger" : "";

		let index = 0;
		const linescoresHeader = gameScoreCardData.away.periods.map((period) => {
			index++;
			if ((sportName == "NHL" && index == 4) || index == 5) {
				return (
					<Col xs={1} className="text-center">
						{"OT"}
					</Col>
				);
			} else if ((sportName == "NHL" && index > 4) || index > 5) {
				let numberOT = sportName == "NHL" ? (index - 4).toString() : (index - 5).toString();
				return (
					<Col xs={1} className="text-center">
						{numberOT + "OT"}
					</Col>
				);
			} else {
				return (
					<Col xs={1} className="text-center">
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
			title = <Col className="">{gameScoreCardData.shortDetail}</Col>;
		} else if (sportName === "MLB") {
			let awayRuns, homeRuns;

			title = (
				<>
					<Col xs={6} className={` ${titleStyle}`}>
						{gameScoreCardData.detail}
					</Col>
					<Col xs={3} className="font-weight-bold text-right">
						{"R"}
					</Col>
					<Col xs={1} className="text-center">
						{"H"}
					</Col>
					<Col xs={1} className="text-center">
						{"E"}
					</Col>
				</>
			);

			if (gameScoreCardData.away.periods.length !== 0) {
				awayPeriods = gameScoreCardData.away.periods.map((period) => {
					if (period?.name === "runs") {
						awayRuns = period.displayValue;
						return (
							<Col xs={3} className="font-weight-bold text-right">
								{period?.displayValue}
							</Col>
						);
					} else if (period?.name === "errors") {
						return (
							<Col xs={1} className="mr-auto text-center">
								{period?.displayValue}
							</Col>
						);
					} else {
						return (
							<Col xs={1} className="text-center">
								{period?.displayValue}
							</Col>
						);
					}
				});
			}
			if (gameScoreCardData.home.periods.length !== 0) {
				homePeriods = gameScoreCardData.home.periods.map((period) => {
					if (period?.name === "runs") {
						homeRuns = period.displayValue;
						return (
							<Col xs={3} className="font-weight-bold text-right">
								{period?.displayValue}
							</Col>
						);
					} else if (period?.name === "errors") {
						return (
							<Col xs={1} className="mr-auto text-center">
								{period?.displayValue}
							</Col>
						);
					} else {
						return (
							<Col xs={1} className="text-center">
								{period?.displayValue}
							</Col>
						);
					}
				});
			}

			if (gameScoreCardData.status.type.state === "post") {
				awayFinalStyle = awayRuns > homeRuns ? "winIndicatorMLB" : "text-secondary";
				homeFinalStyle = homeRuns > awayRuns ? "winIndicatorMLB" : "text-secondary";
			}
		} else {
			title = (
				<>
					<Col xs={6} className={` ${titleStyle}`}>
						{gameScoreCardData.shortDetail}
					</Col>
					{linescoresHeader}
					<Col xs={1} className="font-weight-bold text-center">
						{"T"}
					</Col>
				</>
			);
			awayPeriods = (
				<>
					{gameScoreCardData.away.periods.map((period) => {
						return (
							<Col xs={1} className="text-center">
								{period.value}
							</Col>
						);
					})}
				</>
			);
			homePeriods = (
				<>
					{gameScoreCardData.home.periods.map((period) => {
						return (
							<Col xs={1} className="text-center">
								{period.value}
							</Col>
						);
					})}
				</>
			);
			awayScore = (
				<Col xs={1} className="font-weight-bold mr-auto">
					{gameScoreCardData.away.score}
				</Col>
			);
			homeScore = (
				<Col xs={1} className="font-weight-bold mr-auto">
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
	};

	const { gameScoreCardData, sportName } = props;
	const { title, awayPeriods, awayScore, homePeriods, homeScore, awayFinalStyle, homeFinalStyle } =
		scoreTableHelper(gameScoreCardData, sportName);

	return (
		<>
			<Row className="py-2 align-items-center border">{title}</Row>

			<Row className={`my-3 align-items-center ${awayFinalStyle}`}>
				<Col xs={2} md={2} lg={3} xl={2} className="text-right">
					<Image width={40} height={40} src={gameScoreCardData.away.logo} rounded />
				</Col>
				<Col xs={4} md={4} lg={3} xl={4} className="">
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
				<Col xs={2} md={2} lg={3} xl={2} className="text-right">
					<Image width={40} height={40} src={gameScoreCardData.home.logo} rounded />
				</Col>
				<Col xs={4} md={4} lg={3} xl={4} className="">
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

export default GameScore;
