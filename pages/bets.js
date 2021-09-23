import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { getSession } from "next-auth/client";
import BetCard from "../components/BetCard";

function Bets(props) {
	const { currentUser, nflBets, mlbBets, nbaBets, ncaabBets, nhlBets, wnbaBets } = props;
	const { sportsData } = useContext(SportContext);
	const [bets, setBets] = useState([]);
	const [search, setSearch] = useState("");
	const [searchState, setSearchState] = useState(true);

	const betsGames = [...nflBets, ...mlbBets, ...nbaBets, ...ncaabBets, ...nhlBets, ...wnbaBets].map((bet) => {
		const sport = sportsData.find((sport) => sport.display_name === bet.details.displayName);
		const event = sport.data.events?.find((event) => event.id === bet.details.id);
		bet.event = event;
		return bet;
	});

	useEffect(() => {
		console.log("search useEffect", betsGames);
		const filteredBets = betsGames.filter((bet) => {
			return (
				bet.details.displayName.toLowerCase().includes(search.toLowerCase()) ||
				bet.details.name.toLowerCase().includes(search.toLowerCase())
			);
		});

		if (filteredBets.length === 0) {
			setBets(betsGames);
			setSearchState(false);
		} else {
			setBets(filteredBets);
			setSearchState(true);
		}
	}, [search]);

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
														<i className="nc-icon nc-money-coins"></i>
													</InputGroup.Text>
												</InputGroup.Prepend>
												<Form.Control
													name="search"
													type="text"
													value={search}
													onChange={(e) => {
														setSearch(e.target.value);
													}}
													placeholder="Search..."
												/>
											</InputGroup>
										</Form.Group>
									</Col>
								</Row>
							</Card.Header>
							<Card.Body>
								<Row className="align-items-center">
									<Col xs={4}>{"Closing Soon"}</Col>
									<Col xs={4}>{"Game Starting Soon"}</Col>
									<Col xs={4}>{"Game Today"}</Col>
								</Row>
							</Card.Body>
						</Card>
					</Form>
				</Col>
			</Row>
			{searchState ? null : <label className="error">No bets found.</label>}
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
	const nflBets = betsData
		.filter((bet) => bet.details.displayName === "NFL")
		.sort((a, b) => {
			new Date(a.details.date) - new Date(b.details.date);
		});

	const mlbBets = betsData
		.filter((bet) => bet.details.displayName === "MLB")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const nbaBets = betsData
		.filter((bet) => bet.details.displayName === "NBA")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const ncaabBets = betsData
		.filter((bet) => bet.details.displayName === "NCAA Men's Basketball")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const nhlBets = betsData
		.filter((bet) => bet.details.displayName === "NHL")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const wnbaBets = betsData
		.filter((bet) => bet.details.displayName === "WNBA")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});

	return {
		props: { currentUser, nflBets, mlbBets, nbaBets, ncaabBets, nhlBets, wnbaBets },
	};
}
