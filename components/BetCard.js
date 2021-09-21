import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button, Collapse, Carousel } from "react-bootstrap";
import { BetData } from "../helpers/BetCard";
import axios from "axios";

function BetCard(props) {
	const { betsData, currentUser } = props;

	console.log("bets Data", betsData);
	console.log("currentUser", currentUser);

	let betItems = betsData.map((bet, key) => {
		if (bet.event) {
			return (
				<Container fluid key={key}>
					{/* For extra lage screen */}
					<Col className="mx-0 px-0 d-none d-xl-block">
						<Row className="mt-3 mb-3 border rounded">
							<Col>{bet.details.name}</Col>
						</Row>
					</Col>

					{/* For large screen */}
					<Col className="mx-0 px-0 d-none d-lg-block d-xl-none">
						<Row className="mt-3 mb-3 border rounded">
							<Col>{bet.details.name}</Col>
						</Row>
					</Col>

					{/* For medium screen */}
					<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
						<Row className="mt-3 mb-3 border rounded">
							<Col>{bet.details.name}</Col>
						</Row>
					</Col>

					{/* For small screen */}
					<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
						<Row className="mt-3 mb-3 border rounded">
							<Col>{bet.details.name}</Col>
						</Row>
					</Col>

					{/* For xs screen */}
					<Col className="mx-0 px-0 d-block d-sm-none">
						<Row className="mt-3 mb-3 border rounded">
							<Col>{bet.details.name}</Col>
						</Row>
					</Col>
				</Container>
			);
		}
	});

	return betItems;
}

export default BetCard;
