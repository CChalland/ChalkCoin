import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BetGameData } from "../helpers/BetCard";
import BetScore from "./BetScore";
import axios from "axios";

function BetCard(props) {
	const { betsData, currentUser } = props;

	console.log("bets Data", betsData);
	// console.log("currentUser", currentUser);

	let betItems = betsData.map((bet, key) => {
		if (bet.event) {
			return (
				<Container fluid key={key}>
					{/* For extra lage screen */}
					<Col className="mx-0 px-0 d-none d-xl-block">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={BetGameData(bet)} />
								</Col>
							</Row>
						</Card>
					</Col>

					{/* For large screen */}
					<Col className="mx-0 px-0 d-none d-lg-block d-xl-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={BetGameData(bet)} />
								</Col>
							</Row>
						</Card>
					</Col>

					{/* For medium screen */}
					<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={BetGameData(bet)} />
								</Col>
							</Row>
						</Card>
					</Col>

					{/* For small screen */}
					<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={BetGameData(bet)} />
								</Col>
							</Row>
						</Card>
					</Col>

					{/* For xs screen */}
					<Col className="mx-0 px-0 d-block d-sm-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={BetGameData(bet)} />
								</Col>
							</Row>
						</Card>
					</Col>
				</Container>
			);
		}
	});

	return betItems;
}

export default BetCard;
