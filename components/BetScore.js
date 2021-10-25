import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import moment from "moment";

function BetScores({ betGameScoreData }) {
	const gameTime = moment(betGameScoreData.date);
	const daysUntil = gameTime.diff(new Date(), "days");
	const [day, date, month] = gameTime.format("ddd,Do,MMM").split(",");

	const betScoreHelper = (gameData) => {
		let calendarCard, gameTimeCard, awayScore, homeScore;
		if (gameData.status.type.state === "pre") {
			if (daysUntil > 6) {
				calendarCard = (
					<Card border="secondary" style={{ width: "4rem" }}>
						<p className="text-danger text-center my-1 border-bottom">{month}</p>
						<p className="text-center my-2">{date}</p>
					</Card>
				);
			} else if (daysUntil > 1) {
				calendarCard = (
					<Card border="secondary" style={{ width: "4rem" }}>
						<p className="text-danger text-center my-1 border-bottom">{day}</p>
						<p className="text-center my-2">{date}</p>
					</Card>
				);
			} else {
				calendarCard = (
					<Card border="secondary" style={{ width: "4rem" }}>
						<p className="text-danger text-center my-1 border-bottom">{day}</p>
						<p className="text-center my-2">{date}</p>
					</Card>
				);
			}
		} else if (gameData.status.type.state === "in") {
			if (betGameScoreData.sportName === "MLB") {
				const [topBot, inning] = betGameScoreData.detail.split(" ");
				calendarCard = (
					<Card border="secondary" style={{ width: "4rem" }}>
						<p className="text-danger text-center my-1 border-bottom">{inning}</p>
						<p className="text-center my-2">{topBot}</p>
					</Card>
				);
			} else if (betGameScoreData.sportName === "NFL") {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				calendarCard = (
					<Card border="secondary" style={{ width: "4rem" }}>
						<p className="text-danger text-center my-1 border-bottom">{period}</p>
						<p className="text-center my-2">{time}</p>
					</Card>
				);
			} else {
				const [period, time] = betGameScoreData.detail.split(" ");
				calendarCard = (
					<Card border="secondary" style={{ width: "4rem" }}>
						<p className="text-center my-2">{time}</p>
						<p className="text-danger text-center my-1 border-bottom">{period}</p>
					</Card>
				);
			}
			awayScore = <p className="font-weight-bold mr-auto">{gameData.away.score}</p>;
			homeScore = <p className="font-weight-bold mr-auto">{gameData.home.score}</p>;
		} else if (gameData.status.type.state === "post") {
			awayScore = <p className="font-weight-bold mr-auto">{gameData.away.score}</p>;
			homeScore = <p className="font-weight-bold mr-auto">{gameData.home.score}</p>;
		}

		return { calendarCard, gameTimeCard, awayScore, homeScore };
	};

	const { calendarCard, gameTimeCard, awayScore, homeScore } = betScoreHelper(betGameScoreData);
	return (
		<Container fluid>
			<Row className="">
				<Col xl={"auto"} className="mt-2 text-secondary">
					{calendarCard}
					{gameTimeCard}
				</Col>
				<Col xl={8} className="">
					<Row className="mb-4">
						<Col xl={4} className="">
							<Image width={35} height={35} src={betGameScoreData.away.logo} rounded />
						</Col>
						<Col xl={5} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.away.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.away.records[0].summary}, ${betGameScoreData.away.records[1].summary} ${betGameScoreData.away.homeAway})`}
							</Row>
						</Col>
						<Col xl={3} className="">
							{awayScore}
						</Col>
					</Row>

					<Row className="mt-4">
						<Col xl={4} className="">
							<Image width={35} height={35} src={betGameScoreData.home.logo} rounded />
						</Col>
						<Col xl={5} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.home.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.home.records[0].summary}, ${betGameScoreData.home.records[1].summary} ${betGameScoreData.home.homeAway})`}
							</Row>
						</Col>
						<Col xl={3} className="">
							{homeScore}
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetScores;
