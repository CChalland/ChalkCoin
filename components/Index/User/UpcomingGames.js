import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export default function UpcomingGames({ games }) {
	console.log("UpcomingGames - games", games);

	return (
		<Container>
			<Row>
				<Col>
					<h4>UpcomingGames</h4>
				</Col>
			</Row>
		</Container>
	);
}
