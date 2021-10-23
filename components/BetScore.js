import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import moment from "moment";

function BetScores({ betGameScoreData }) {
	const gameTime = moment(betGameScoreData.date);
	const daysUntil = gameTime.diff(new Date(), "days");
	const [day, date, month, time] = gameTime.format("ddd,Do,MMM,h:mm a").split(",");

	const betScoreHelper = (gameData) => {
		let calendarCard, gameTimeCard, awayScore, homeScore;
		if (gameData.status.type.state === "pre") {
			if (daysUntil > 6) {
				calendarCard = (
					<div>
						{time}
						<Card border="secondary">
							<p className="text-danger text-center my-1 border-bottom">{month}</p>
							<p className="text-center my-1">{date}</p>
						</Card>
					</div>
				);
			} else if (daysUntil > 1) {
				calendarCard = (
					<div>
						{time}
						<Card border="secondary">
							<p className="text-danger text-center my-1 border-bottom">{day}</p>
							<p className="text-center my-1">{date}</p>
						</Card>
					</div>
				);
			} else {
				calendarCard = (
					<div>
						{time}
						<Card border="secondary">
							<p className="text-danger text-center my-1 border-bottom">{day}</p>
							<p className="text-center my-1">{date}</p>
						</Card>
					</div>
				);
			}
		} else if (gameData.status.type.state === "in") {
			if (betGameScoreData.sportName === "MLB") {
				const [topBot, inning] = betGameScoreData.detail.split(" ");
				calendarCard = (
					<div>
						<Card border="secondary">
							<p className="text-center my-1 mx-2">{inning}</p>
							<p className="text-danger text-center my-1 border-top mx-2">{topBot}</p>
						</Card>
					</div>
				);
			} else if (betGameScoreData.sportName === "NFL") {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				calendarCard = (
					<div>
						<Card border="secondary">
							<p className="text-danger text-center my-1 mx-2">{period}</p>
							<p className="text-center my-1 border-top mx-2">{time}</p>
						</Card>
					</div>
				);
			} else {
				const [period, time] = betGameScoreData.detail.split(" ");
				calendarCard = (
					<div>
						<Card border="secondary">
							<p className="text-center my-1 mx-2">{time}</p>
							<p className="text-danger text-center my-1 border-top mx-2">{period}</p>
						</Card>
					</div>
				);
			}
			awayScore = (
				<Col className="">
					<p className="font-weight-bold mr-auto">{gameData.away.score}</p>
				</Col>
			);
			homeScore = (
				<Col className="">
					<p className="font-weight-bold mr-auto">{gameData.home.score}</p>
				</Col>
			);
		} else if (gameData.status.type.state === "post") {
			awayScore = (
				<Col className="">
					<p className="font-weight-bold mr-auto">{gameData.away.score}</p>
				</Col>
			);
			homeScore = (
				<Col className="">
					<p className="font-weight-bold mr-auto">{gameData.home.score}</p>
				</Col>
			);
		}

		return { calendarCard, gameTimeCard, awayScore, homeScore };
	};

	const { calendarCard, gameTimeCard, awayScore, homeScore } = betScoreHelper(betGameScoreData);
	return (
		<Container fluid>
			<Row className="">
				<Col xs={"auto"} className="mt-4 text-secondary">
					{calendarCard}
					{gameTimeCard}
				</Col>
				<Col xs={"auto"} className="">
					<Row className=" align-items-center">
						<Col xs={"auto"} className="">
							<Image width={35} height={35} src={betGameScoreData.away.logo} rounded />
						</Col>
						<Col xs={"auto"} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.away.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.away.records[0].summary}, ${betGameScoreData.away.records[1].summary} ${betGameScoreData.away.homeAway})`}
							</Row>
						</Col>
						{awayScore}
					</Row>

					<Row className=" align-items-center">
						<Col xs={"auto"} className="">
							<Image width={35} height={35} src={betGameScoreData.home.logo} rounded />
						</Col>
						<Col xs={"auto"} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.home.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.home.records[0].summary}, ${betGameScoreData.home.records[1].summary} ${betGameScoreData.home.homeAway})`}
							</Row>
						</Col>
						{homeScore}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetScores;
