import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Image, Button } from "react-bootstrap";
import { getSession } from "next-auth/client";
import { BetContext } from "../contexts/Bets.Context";
import BetCard from "../components/BetCard";

function Bets({ currentUser }) {
	const sportWithBets = useContext(BetContext);
	const betSorted = sportWithBets.pendingBets.openBets
		.map((sport) => {
			return sport.bets;
		})
		.flat()
		.filter((bet) => bet.requesterId !== currentUser.id);
	const [openBets, setOpenBets] = useState(betSorted);
	const [bets, setBets] = useState([]);
	const [search, setSearch] = useState("");
	const [searchState, setSearchState] = useState(true);
	const [nflState, setNFLState] = useState(false);
	const [mlbState, setMLBState] = useState(false);
	const [nbaState, setNBAState] = useState(false);
	const [ncaabState, setNCAABState] = useState(false);
	const [nhlState, setNHLState] = useState(false);
	const [wnbaState, setWNBAState] = useState(false);

	// console.log("sportWithBets", sportWithBets);
	// console.log("openBets", openBets);
	// console.log("bets", bets);

	useEffect(() => {
		setOpenBets(betSorted);
	}, [sportWithBets]);

	useEffect(() => {
		let filteredBetsData = [];
		if (!nflState && !mlbState && !nbaState && !ncaabState && !nhlState && !wnbaState) {
			filteredBetsData = openBets;
		} else {
			if (nflState) {
				const nflBets = openBets.filter((bet) => {
					return bet.details.displayName === "NFL";
				});
				filteredBetsData = [...filteredBetsData, ...nflBets];
			}
			if (mlbState) {
				const mlbBets = openBets.filter((bet) => {
					return bet.details.displayName === "MLB";
				});
				filteredBetsData = [...filteredBetsData, ...mlbBets];
			}
			if (nbaState) {
				const nbaBets = openBets.filter((bet) => {
					return bet.details.displayName === "NBA";
				});
				filteredBetsData = [...filteredBetsData, ...nbaBets];
			}
			if (ncaabState) {
				const ncaabBets = openBets.filter((bet) => {
					return bet.details.displayName === "NCAA Men's Basketball";
				});
				filteredBetsData = [...filteredBetsData, ...ncaabBets];
			}
			if (nhlState) {
				const nhlBets = openBets.filter((bet) => {
					return bet.details.displayName === "NHL";
				});
				filteredBetsData = [...filteredBetsData, ...nhlBets];
			}
			if (wnbaState) {
				const wnbaBets = openBets.filter((bet) => {
					return bet.details.displayName === "WNBA";
				});
				filteredBetsData = [...filteredBetsData, ...wnbaBets];
			}
		}

		const searchedBets = filteredBetsData.filter((bet) => {
			return (
				bet?.details.displayName.toLowerCase().includes(search.toLowerCase()) ||
				bet?.details.name.toLowerCase().includes(search.toLowerCase())
			);
		});

		if (searchedBets.length === 0) {
			setBets(filteredBetsData);
			setSearchState(false);
		} else {
			setBets(searchedBets);
			setSearchState(true);
		}
	}, [openBets, search, nflState, mlbState, nbaState, ncaabState, nhlState, wnbaState]);

	const sportButtons = sportWithBets.pendingBets.openBets.map((sport, key) => {
		let buttonClass;
		if (sport.displayName === "NFL") {
			buttonClass = nflState ? "btn-round" : "btn-outline btn-round";
		} else if (sport.displayName === "MLB") {
			buttonClass = mlbState ? "btn-round" : "btn-outline btn-round";
		} else if (sport.displayName === "NBA") {
			buttonClass = nbaState ? "btn-round" : "btn-outline btn-round";
		} else if (sport.displayName === "NCAA Men's Basketball") {
			buttonClass = ncaabState ? "btn-round" : "btn-outline btn-round";
		} else if (sport.displayName === "NHL") {
			buttonClass = nhlState ? "btn-round" : "btn-outline btn-round";
		} else if (sport.displayName === "WNBA") {
			buttonClass = wnbaState ? "btn-round" : "btn-outline btn-round";
		}

		return (
			<Col xs={"auto"} key={key}>
				<Button
					className={`${buttonClass}`}
					variant="default"
					onClick={() => {
						if (sport.displayName === "NFL") {
							setNFLState(!nflState);
						} else if (sport.displayName === "MLB") {
							setMLBState(!mlbState);
						} else if (sport.displayName === "NBA") {
							setNBAState(!nbaState);
						} else if (sport.displayName === "NCAA Men's Basketball") {
							setNCAABState(!ncaabState);
						} else if (sport.displayName === "NHL") {
							setNHLState(!nhlState);
						} else if (sport.displayName === "WNBA") {
							setWNBAState(!wnbaState);
						}
					}}
				>
					<Image height={30} src={`../static/media/sports-icons/${sport.icon}.png`} rounded />
				</Button>
			</Col>
		);
	});

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
								<Row>{sportButtons}</Row>
								<Row className="align-items-center">
									<Col xs={4} md={3}>
										<Row>
											<Col xs={4} sm="auto" className="mr-0 pr-0">
												<Button
													className="btn-outline"
													type="button"
													variant="danger"
													style={{ width: "1.5rem", height: "1.5rem" }}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="ml-1 pl-1">
												{"Closing Soon"}
											</Col>
										</Row>
									</Col>
									<Col xs={4}>
										<Row>
											<Col xs={4} sm="auto" className="mr-0 pr-0">
												<Button
													className="btn-outline"
													type="button"
													variant="warning"
													style={{ width: "1.5rem", height: "1.5rem" }}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="ml-1 pl-1">
												{"Game Starting Soon"}
											</Col>
										</Row>
									</Col>
									<Col xs={4}>
										<Row>
											<Col xs={4} sm="auto" className="mr-0 pr-0">
												<Button
													className="btn-outline"
													type="button"
													variant="info"
													style={{ width: "1.5rem", height: "1.5rem" }}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="ml-1 pl-1">
												{"Game Today"}
											</Col>
										</Row>
									</Col>
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
			include: {
				requester: {
					select: { id: true },
				},
				accepter: {
					select: { id: true },
				},
				recipient: {
					select: { id: true },
				},
			},
		});
		delete currentUser.password;
		delete currentUser.paypal;
		delete currentUser.emailVerified;
		delete currentUser.createdAt;
		delete currentUser.updatedAt;
	}

	return {
		props: { currentUser },
	};
}
