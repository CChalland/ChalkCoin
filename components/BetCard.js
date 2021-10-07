import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BetDispatch } from "../contexts/Bets.Context";
import { BetGameData } from "../helpers/BetCard";
import BetScore from "./BetScore";
import BetOdds from "./BetOdds";
import BetWinner from "./BetWinner";
import axios from "axios";

function BetCard({ betsData, currentUser }) {
	const dispatch = useContext(BetDispatch);

	const handleBet = async (bet) => {
		const betReqData = { betId: bet.id, currentUserId: currentUser.id };
		await axios.post("http://localhost:4000/api/acceptBet", betReqData).then((res) => {
			dispatch({ type: "ACCEPTED BET", data: res.data });
		});
	};

	let betItems = betsData.map((bet, key) => {
		if (bet.event) {
			const betGameData = BetGameData(bet);
			const betWinnerData = {
				amount: bet.amount,
				acceptingTeam: betGameData.away.requesterTeam ? betGameData.home : betGameData.away,
			};

			return (
				<Container key={key} fluid>
					<Card>
						<Row className="">
							<Col xs={"auto"} className="">
								<BetScore key={bet.event.uid.toString()} betGameScoreData={betGameData} />
							</Col>
							<Col xs={"auto"}>
								<BetOdds betGameOdds={betGameData} />
							</Col>
							<Col>
								<BetWinner betWinnerData={betWinnerData} />
							</Col>
							<Col>
								<Button
									className="btn-round btn-wd"
									type="button"
									variant="success"
									onClick={() => {
										handleBet(bet);
									}}
								>
									<span className="btn-label">
										<i className="fas fa-plus"></i>
									</span>
									Accept
								</Button>
							</Col>
						</Row>
					</Card>

					{/* For extra lage screen */}
					{/* <Col className="mx-0 px-0 d-none d-xl-block">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={betGameScoreData} />
								</Col>
							</Row>
						</Card>
					</Col> */}

					{/* For large screen */}
					{/* <Col className="mx-0 px-0 d-none d-lg-block d-xl-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={betGameScoreData} />
								</Col>
								<Col>
									<BetOdds />
								</Col>
							</Row>
						</Card>
					</Col> */}

					{/* For medium screen */}
					{/* <Col className="mx-0 px-0 d-none d-md-block d-lg-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={betGameScoreData} />
								</Col>
							</Row>
						</Card>
					</Col> */}

					{/* For small screen */}
					{/* <Col className="mx-0 px-0 d-none d-sm-block d-md-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={betGameScoreData} />
								</Col>
							</Row>
						</Card>
					</Col> */}

					{/* For xs screen */}
					{/* <Col className="mx-0 px-0 d-block d-sm-none">
						<Card>
							<Row className="">
								<Col className="">
									<BetScore key={bet.event.uid.toString()} betGameScoreData={betGameScoreData} />
								</Col>
							</Row>
						</Card>
					</Col> */}
				</Container>
			);
		}
	});

	return betItems;
}

export default BetCard;
