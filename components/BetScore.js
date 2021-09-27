import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import moment from "moment";

function BetScores({ betGameScoreData }) {
	const gameTime = moment(betGameScoreData.date);
	const daysUntil = gameTime.diff(new Date(), "days");
	const [day, date, month, time] = gameTime.format("ddd,Do,MMM,h:mm a").split(",");

	const calendarCardHelper = (gameData) => {
		let calendarCard, gameTimeCard;
		if (
			gameData.status.type.name === "STATUS_SCHEDULED" ||
			gameData.status.type.name === "STATUS_POSTPONED" ||
			gameData.status.type.name === "STATUS_DELAYED"
		) {
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
		}

		return { calendarCard, gameTimeCard };
	};

	console.log("props gameData ", betGameScoreData);
	console.log(day, date, month, time);

	const { calendarCard, gameTimeCard } = calendarCardHelper(betGameScoreData);
	return (
		<Container fluid>
			<Row>
				<Col xs={"auto"} className="text-secondary">
					{calendarCard}
					{gameTimeCard}
				</Col>
				<Col xs={"auto"} className="">
					<Row className="my-2 align-items-center">
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
					</Row>

					<Row className="my-2 align-items-center">
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
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetScores;
