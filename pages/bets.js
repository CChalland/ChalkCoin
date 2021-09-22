import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { getSession } from "next-auth/client";
import BetCard from "../components/BetCard";
import axios from "axios";

// async function fetchBetsJSON() {
// 	const res = await fetch("http://localhost:4000/api/bets");
// 	const bets = await res.json();
// 	return bets;
// }

function Bets(props) {
	const { betsData, currentUser } = props;
	const { sportsData } = useContext(SportContext);
	const [bets, setBets] = useState(betsData);
	const [search, setSearch] = useState("");
	const [searchState, setSearchState] = useState(true);

	const betsGames = betsData.map((bet) => {
		const sport = sportsData.find((sport) => sport.display_name === bet.details.displayName);
		const event = sport.data.events?.find((event) => event.id === bet.details.id);
		bet.event = event;
		return bet;
	});

	// useEffect(() => {
	// 	const getData = async () => {
	// 		fetchBetsJSON().then((bets) => {
	// 			setBets(bets);
	// 		});
	// 	};
	// 	getData();
	// }, []);

	console.log(search);

	return (
		<Container fluid>
			<Row>
				<Col>
					<Form>
						<Card>
							<Card.Header>
								<Row className="mt-2 align-items-center">
									<Col xs={"auto"} className="">
										<h2 className="mt-0 pt-0">{"BETS: "}</h2>
									</Col>
									<Col xs={7} className="mx-0 px-0">
										<Form.Group className={searchState ? "has-success" : "has-error"}>
											<InputGroup>
												<InputGroup.Prepend>
													<InputGroup.Text>
														<i className="nc-icon nc-single-02"></i>
													</InputGroup.Text>
												</InputGroup.Prepend>
												<Form.Control
													name="search"
													type="text"
													value={search}
													onChange={(e) => {
														setSearch(e.target.value);
														// if (minValue(e.target.value, 0)) {
														// 	setAmountState(true);
														// } else {
														// 	setAmountState(false);
														// }
													}}
													placeholder="Search..."
												/>
											</InputGroup>
										</Form.Group>
									</Col>
								</Row>
							</Card.Header>
						</Card>
					</Form>
				</Col>
			</Row>
			<BetCard betsData={bets} currentUser={currentUser} />
		</Container>
	);
}

export default Bets;

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	let currentUser = {};
	if (session) {
		currentUser = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
		});
		delete currentUser.password;
		delete currentUser.paypal;
		delete currentUser.emailVerified;
		delete currentUser.createdAt;
		delete currentUser.updatedAt;
	}

	let bets = await prisma.bet.findMany({
		where: {
			accepted: false,
		},
	});
	const betPromises = bets.map(async (bet) => {
		bet.details = JSON.parse(bet.details);
		bet.createdAt = JSON.stringify(bet.createdAt);
		bet.updatedAt = JSON.stringify(bet.updatedAt);
		return bet;
	});
	const betsData = await Promise.all(betPromises);

	return {
		props: { currentUser, betsData },
	};
}
