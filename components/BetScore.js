import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

function BetScores({ betGameScoreData }) {
	console.log(betGameScoreData);
	return (
		<Container fluid>
			<Row className="">
				<Card.Header>{betGameScoreData.shortDetail}</Card.Header>
			</Row>

			<Row className="">
				<Col xs={"auto"} className="">
					<Image width={40} height={40} src={betGameScoreData.away.logo} rounded />
				</Col>
				<Col xs={4} md={4} lg={3} xl={3} className="">
					<Row className="mb-0 h5">{betGameScoreData.away.name}</Row>
					<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
						{`(${betGameScoreData.away.records[0].summary}, ${betGameScoreData.away.records[1].summary} ${betGameScoreData.away.homeAway})`}
					</Row>
				</Col>
			</Row>

			<Row className="">
				<Col xs={"auto"} className="">
					<Image width={40} height={40} src={betGameScoreData.home.logo} rounded />
				</Col>
				<Col xs={4} md={4} lg={3} xl={3} className="">
					<Row className="mb-0 h5">{betGameScoreData.home.name}</Row>
					<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
						{`(${betGameScoreData.home.records[0].summary}, ${betGameScoreData.home.records[1].summary} ${betGameScoreData.home.homeAway})`}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetScores;
