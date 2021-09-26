import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

function BetScores({ betGameScoreData }) {
	return (
		<Container fluid>
			<Col className="">
				<Row className="text-secondary">{betGameScoreData.shortDetail}</Row>

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
		</Container>
	);
}

export default BetScores;
