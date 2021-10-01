import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function BetWinner(props) {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Row>{"Worth"}</Row>
					<Row>{"$"}</Row>
				</Col>
				<Col>
					<Row>Winner</Row>
					<Row>{"Team"}</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default BetWinner;
