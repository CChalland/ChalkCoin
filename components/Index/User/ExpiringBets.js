import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export default function ExpiringBets({ bets }) {
	console.log("ExpiringBets - bets", bets);

	return (
		<Container>
			<Row>
				<Col>
					<h4>ExpiringBets</h4>
				</Col>
			</Row>
		</Container>
	);
}
