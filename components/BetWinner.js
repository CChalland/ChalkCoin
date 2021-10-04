import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

function BetWinner({ betWinnerData }) {
	console.log(betWinnerData);
	return (
		<Container fluid>
			<Row>
				<Col>
					<Row>{"Worth"}</Row>
					<Row>${betWinnerData.amount}</Row>
				</Col>
				<Col>
					<Row>Winner</Row>
					<Row className="my-2 align-items-center">
						<Col xs={"auto"} className="">
							<Image width={35} height={35} src={betWinnerData.acceptingTeam.logo} rounded />
						</Col>
						<Col xs={"auto"} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betWinnerData.acceptingTeam.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betWinnerData.acceptingTeam.records[0].summary}, ${betWinnerData.acceptingTeam.records[1].summary} ${betWinnerData.acceptingTeam.homeAway})`}
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetWinner;
