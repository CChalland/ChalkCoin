import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export default function ExpiringBets({ user }) {
	console.log("ExpiringBets - user", user);

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
