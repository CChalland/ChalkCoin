import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import moment from "moment";

function BetScores({ betGameScoreData }) {
	const gameTime = moment(betGameScoreData.date);
	const daysUntil = gameTime.diff(new Date(), "days");
	const [day, date, month] = gameTime.format("ddd,Do,MMM").split(",");

	const betScoreHelper = (gameData) => {
		let scoreCard, awayScore, homeScore;
		if (gameData.status.type.state === "pre") {
			if (daysUntil > 6) {
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{month}</p>
							<p className="text-center my-2">{date}</p>
						</Card>
					</Col>
				);
			} else if (daysUntil > 1) {
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{day}</p>
							<p className="text-center my-2">{date}</p>
						</Card>
					</Col>
				);
			} else {
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{day}</p>
							<p className="text-center my-2">{date}</p>
						</Card>
					</Col>
				);
			}
		} else if (gameData.status.type.state === "in") {
			if (betGameScoreData.sportName === "MLB") {
				const [topBot, inning] = betGameScoreData.detail.split(" ");
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{inning}</p>
							<p className="text-center my-2">{topBot}</p>
						</Card>
					</Col>
				);
			} else if (betGameScoreData.sportName === "NFL") {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{period}</p>
							<p className="text-center my-2">{time}</p>
						</Card>
					</Col>
				);
			} else if (betGameScoreData.sportName === "NCAA Football") {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{period}</p>
							<p className="text-center my-2">{time}</p>
						</Card>
					</Col>
				);
			} else {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{period}</p>
							<p className="text-center my-2">{time}</p>
						</Card>
					</Col>
				);
			}
			awayScore = <p className="font-weight-bold mr-auto">{gameData.away.score}</p>;
			homeScore = <p className="font-weight-bold mr-auto">{gameData.home.score}</p>;
		} else if (gameData.status.type.state === "post") {
			awayScore = <p className="font-weight-bold mr-auto">{gameData.away.score}</p>;
			homeScore = <p className="font-weight-bold mr-auto">{gameData.home.score}</p>;
		}

		return { scoreCard, awayScore, homeScore };
	};

	const { scoreCard, awayScore, homeScore } = betScoreHelper(betGameScoreData);
	return (
		<Container fluid>
			<Row className="">
				{scoreCard}
				<Col xs={9} sm={8} className="">
					<Row className="mb-4">
						<Col xs={4} sm={4} lg={3} className="">
							<Image width={35} height={35} src={betGameScoreData.away.logo} rounded />
						</Col>
						<Col xs={5} sm={5} lg={6} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.away.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.away.records[0].summary}, ${betGameScoreData.away.records[1].summary} ${betGameScoreData.away.homeAway})`}
							</Row>
						</Col>
						<Col xs={3} sm={3} lg={3} className="mr-0 pr-0">
							{awayScore}
						</Col>
					</Row>

					<Row className="mt-4">
						<Col xs={4} sm={4} lg={3} className="">
							<Image width={35} height={35} src={betGameScoreData.home.logo} rounded />
						</Col>
						<Col xs={5} sm={5} lg={6} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.home.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.home.records[0].summary}, ${betGameScoreData.home.records[1].summary} ${betGameScoreData.home.homeAway})`}
							</Row>
						</Col>
						<Col xs={3} sm={3} lg={3} className="mr-0 pr-0">
							{homeScore}
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetScores;
