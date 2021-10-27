import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

function BetWinner({ betWinnerData }) {
	return (
		<Container fluid>
			<Row className="mt-2">
				<Col>
					<Row>
						<h1 className="my-0" style={{ fontSize: 64 }}>
							${betWinnerData.amount}
						</h1>
					</Row>
				</Col>
				<Col className="">
					<Row className="justify-content-center">
						<Image width={55} height={55} src={betWinnerData.acceptingTeam.logo} rounded />
					</Row>
					<Row className="mb-0 h5 justify-content-center" style={{ fontSize: 16 }}>
						{betWinnerData.acceptingTeam.name}
					</Row>
					<Row className="text-secondary justify-content-center" style={{ fontSize: 11 }}>
						{`(${betWinnerData.acceptingTeam.records[0].summary}, ${betWinnerData.acceptingTeam.records[1].summary} ${betWinnerData.acceptingTeam.homeAway})`}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetWinner;
