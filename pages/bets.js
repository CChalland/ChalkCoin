import { useRouter } from "next/router";
import { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Image, Button } from "react-bootstrap";
import { UserContext } from "../contexts/User.Context";
import { BetContext } from "../contexts/Bets.Context";
import BetCard from "../components/Bet/BetCard";
import Loading from "../components/Utility/Loading";
import NotificationAlert from "react-notification-alert";

export default function Bets() {
	const router = useRouter();
	const currentUser = useContext(UserContext);
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
	const [ncaafState, setNCAAFState] = useState(false);
	const [nflState, setNFLState] = useState(false);
	const [mlbState, setMLBState] = useState(false);
	const [nbaState, setNBAState] = useState(false);
	const [ncaabState, setNCAABState] = useState(false);
	const [nhlState, setNHLState] = useState(false);
	const [wnbaState, setWNBAState] = useState(false);
	const [mlsState, setMLSState] = useState(false);
	const [closingState, setClosingState] = useState(false);
	const [startingState, setStartingState] = useState(false);
	const [todayState, setTodayState] = useState(false);
	const [loading, setLoading] = useState(false);
	const notificationAlertRef = useRef(null);
	const closingClass = closingState ? "" : "btn-outline";
	const startingClass = startingState ? "" : "btn-outline";
	const todayClass = todayState ? "" : "btn-outline";
	const closingSoon = bets?.some((bet) => bet.openStatus === "danger");
	const startSoon = bets?.some((bet) => bet.openStatus === "warning");
	const gameDay = bets?.some((bet) => bet.openStatus === "info");

	const sportButtons = sportWithBets.pendingBets.openBets
		.filter((sport) => sport.bets.some((bet) => bet.requesterId !== currentUser.id))
		.map((sport, key) => {
			let buttonClass;
			if (sport.displayName === "NCAA Football") {
				buttonClass = ncaafState ? "btn-round" : "btn-outline btn-round";
			} else if (sport.displayName === "NFL") {
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
			} else if (sport.displayName === "MLS") {
				buttonClass = mlsState ? "btn-round" : "btn-outline btn-round";
			}
			return (
				<Col xs={"auto"} key={key}>
					<Button
						className={`${buttonClass}`}
						variant="default"
						onClick={() => {
							if (sport.displayName === "NCAA Football") {
								setNCAAFState(!ncaafState);
							} else if (sport.displayName === "NFL") {
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
							} else if (sport.displayName === "MLS") {
								setMLSState(!mlsState);
							}
						}}
					>
						<Image height={30} src={`../static/media/sports-icons/${sport.icon}.png`} rounded />
					</Button>
				</Col>
			);
		});
	const betCards = bets.map((bet) => {
		if (bet.event) {
			return <BetCard acceptState={true} bet={bet} currentUser={currentUser} key={bet.id} />;
		}
	});

	const notify = (errMsg) => {
		let options = {
			place: "tc",
			message: (
				<div>
					<div>
						<b>{errMsg}</b>
					</div>
				</div>
			),
			type: "danger",
			icon: "nc-icon nc-bell-55",
			autoDismiss: 7,
		};
		notificationAlertRef.current.notificationAlert(options);
		router.replace("/bets", undefined, { shallow: true });
	};

	useEffect(() => {
		if (router.query.error) {
			notify(router.query.error);
		}
	}, [router.query.error]);

	useEffect(() => {
		setOpenBets(betSorted);
		setLoading(true);
	}, [sportWithBets]);

	useEffect(() => {
		let filteredBetsData = [];
		if (
			!ncaafState &&
			!nflState &&
			!mlbState &&
			!nbaState &&
			!ncaabState &&
			!nhlState &&
			!wnbaState &&
			!mlsState &&
			!closingState &&
			!startingState &&
			!todayState
		) {
			filteredBetsData = openBets;
		} else {
			if (ncaafState) {
				const ncaafBets = openBets.filter((bet) => {
					return bet.details.sport === "NCAA Football";
				});
				filteredBetsData = [...filteredBetsData, ...ncaafBets];
			}
			if (nflState) {
				const nflBets = openBets.filter((bet) => {
					return bet.details.sport === "NFL";
				});
				filteredBetsData = [...filteredBetsData, ...nflBets];
			}
			if (mlbState) {
				const mlbBets = openBets.filter((bet) => {
					return bet.details.sport === "MLB";
				});
				filteredBetsData = [...filteredBetsData, ...mlbBets];
			}
			if (nbaState) {
				const nbaBets = openBets.filter((bet) => {
					return bet.details.sport === "NBA";
				});
				filteredBetsData = [...filteredBetsData, ...nbaBets];
			}
			if (ncaabState) {
				const ncaabBets = openBets.filter((bet) => {
					return bet.details.sport === "NCAA Men's Basketball";
				});
				filteredBetsData = [...filteredBetsData, ...ncaabBets];
			}
			if (nhlState) {
				const nhlBets = openBets.filter((bet) => {
					return bet.details.sport === "NHL";
				});
				filteredBetsData = [...filteredBetsData, ...nhlBets];
			}
			if (wnbaState) {
				const wnbaBets = openBets.filter((bet) => {
					return bet.details.sport === "WNBA";
				});
				filteredBetsData = [...filteredBetsData, ...wnbaBets];
			}
			if (mlsState) {
				const mlsBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.details.sport === "MLS";
					});
				filteredBetsData = [...filteredBetsData, ...mlsBets];
			}
			if (closingState) {
				const closingBets = openBets.filter((bet) => {
					return bet.openStatus === "danger";
				});
				filteredBetsData = [...filteredBetsData, ...closingBets];
			}
			if (startingState) {
				const startingBets = openBets.filter((bet) => {
					return bet.openStatus === "warning";
				});
				filteredBetsData = [...filteredBetsData, ...startingBets];
			}
			if (todayState) {
				const todayBets = openBets.filter((bet) => {
					return bet.openStatus === "info";
				});
				filteredBetsData = [...filteredBetsData, ...todayBets];
			}
		}

		const searchedBets = filteredBetsData.filter((bet) => {
			return (
				bet?.details.sport.toLowerCase().includes(search.toLowerCase()) ||
				bet?.details.name.toLowerCase().includes(search.toLowerCase())
			);
		});

		if (searchedBets.length === 0) {
			setBets(searchedBets);
			setSearchState(false);
		} else {
			setBets(searchedBets);
			setSearchState(true);
		}
	}, [
		openBets,
		search,
		ncaafState,
		nflState,
		mlbState,
		nbaState,
		ncaabState,
		nhlState,
		wnbaState,
		mlsState,
		closingState,
		startingState,
		todayState,
	]);

	// console.log("betSorted", betSorted);
	// console.log("openBets", openBets);
	// console.log("bets", bets);
	return loading ? (
		<>
			<div className="rna-container">
				<NotificationAlert ref={notificationAlertRef} />
			</div>
			<Container fluid>
				{betSorted.length > 0 ? (
					<Row className="justify-content-center">
						{/* For md, lg, xl and up screens */}
						<Col md={10} xl={8} className="d-none d-md-block d-xl-block">
							<Card>
								<Card.Body>
									<Row>
										<Col>
											<Row>
												<Col>
													<Form.Group className={searchState ? "has-success" : "has-error"}>
														<InputGroup>
															<InputGroup.Prepend>
																<InputGroup.Text>
																	<i className="nc-icon nc-paper-2"></i>
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
											<Row className="justify-content-center">{sportButtons}</Row>
										</Col>

										{closingSoon || startSoon || gameDay ? (
											<Col md={4}>
												{closingSoon ? (
													<Row className="align-items-center">
														<Col sm={"auto"} className="mt-1">
															<Button
																className={closingClass}
																type="button"
																variant="danger"
																style={{ width: "1.5rem", height: "1.5rem" }}
																onClick={() => {
																	setClosingState(!closingState);
																}}
															></Button>
														</Col>
														<Col sm={8} className="ml-1 pl-1">
															<h5 className="my-0" style={{ fontSize: 15 }}>
																{"Closing Soon"}
															</h5>
														</Col>
													</Row>
												) : null}

												{startSoon ? (
													<Row className="align-items-center">
														<Col sm={"auto"} className="mt-1 mr-0 pr-0">
															<Button
																className={startingClass}
																type="button"
																variant="warning"
																style={{ width: "1.5rem", height: "1.5rem" }}
																onClick={() => {
																	setStartingState(!startingState);
																}}
															></Button>
														</Col>
														<Col sm={8} className="ml-1 pl-1">
															<h5 className="my-0" style={{ fontSize: 15 }}>
																{"Game Starting Soon"}
															</h5>
														</Col>
													</Row>
												) : null}

												{gameDay ? (
													<Row className="align-items-center">
														<Col sm={"auto"} className="mt-1 mr-0 pr-0">
															<Button
																className={todayClass}
																type="button"
																variant="info"
																style={{ width: "1.5rem", height: "1.5rem" }}
																onClick={() => {
																	setTodayState(!todayState);
																}}
															></Button>
														</Col>
														<Col sm={8} className="ml-1 pl-1">
															<h5 className="my-0" style={{ fontSize: 15 }}>
																{"Game Today"}
															</h5>
														</Col>
													</Row>
												) : null}
											</Col>
										) : null}
									</Row>
								</Card.Body>
							</Card>
						</Col>

						{/* For xs & sm screens */}
						<Col className="mx-0 px-0 d-block d-md-none">
							<Card>
								<Card.Header className="mx-2">
									<Row className="mt-2 justify-content-center align-items-center">
										<Col className="mx-0 px-0">
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
								<Card.Body className="mx-2">
									<Row className="justify-content-center">{sportButtons}</Row>
									{closingSoon ? (
										<Row className="align-items-center">
											<Col xs={"auto"} className="mt-1 mr-0 pr-0">
												<Button
													className={closingClass}
													type="button"
													variant="danger"
													style={{ width: "1.5rem", height: "1.5rem" }}
													onClick={() => {
														setClosingState(!closingState);
													}}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="ml-1 pl-1">
												<h5 className="my-0" style={{ fontSize: 15 }}>
													{"Closing Soon"}
												</h5>
											</Col>
										</Row>
									) : null}

									{startSoon ? (
										<Row className="align-items-center">
											<Col xs={"auto"} className="mt-1 mr-0 pr-0">
												<Button
													className={startingClass}
													type="button"
													variant="warning"
													style={{ width: "1.5rem", height: "1.5rem" }}
													onClick={() => {
														setStartingState(!startingState);
													}}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="ml-1 pl-1">
												<h5 className="my-0" style={{ fontSize: 15 }}>
													{"Game Starting Soon"}
												</h5>
											</Col>
										</Row>
									) : null}

									{gameDay ? (
										<Row className="align-items-center">
											<Col xs={"auto"} className="mt-1 mr-0 pr-0">
												<Button
													className={todayClass}
													type="button"
													variant="info"
													style={{ width: "1.5rem", height: "1.5rem" }}
													onClick={() => {
														setTodayState(!todayState);
													}}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="ml-1 pl-1">
												<h5 className="my-0" style={{ fontSize: 15 }}>
													{"Game Today"}
												</h5>
											</Col>
										</Row>
									) : null}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				) : null}

				{searchState ? null : (
					<Row>
						<Col className="ml-5">
							<h2>No bets found.</h2>
						</Col>
					</Row>
				)}

				{betCards}
			</Container>
		</>
	) : (
		<Loading />
	);
}
