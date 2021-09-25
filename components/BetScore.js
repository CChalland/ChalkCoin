import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function BetScores({ betGameScoreData }) {
	return (
		<Container fluid>
			<Row className="">{betGameScoreData.shortDetail}</Row>

			<Row className="">
				<Col xs={2} md={2} lg={2} xl={2} className="text-right">
					<Image width={40} height={40} src={betGameScoreData.acceptingTeam.logo} rounded />
				</Col>
				<Col xs={4} md={4} lg={3} xl={3} className="">
					<Row className="mb-0 h5">{betGameScoreData.acceptingTeam.name}</Row>
					<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
						{`(${betGameScoreData.acceptingTeam.records[0].summary}, ${betGameScoreData.acceptingTeam.records[1].summary} ${betGameScoreData.acceptingTeam.homeAway})`}
					</Row>
				</Col>
			</Row>

			<Row className="">
				<Col xs={2} md={2} lg={2} xl={2} className="text-right">
					<Image width={40} height={40} src={betGameScoreData.requesterTeam.logo} rounded />
				</Col>
				<Col xs={4} md={4} lg={3} xl={3} className="">
					<Row className="mb-0 h5">{betGameScoreData.requesterTeam.name}</Row>
					<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
						{`(${betGameScoreData.requesterTeam.records[0].summary}, ${betGameScoreData.requesterTeam.records[1].summary} ${betGameScoreData.requesterTeam.homeAway})`}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetScores;
