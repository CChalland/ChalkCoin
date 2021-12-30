import { useEffect, useState } from "react";
import { Button, Card, Form, Nav, Container, Row, Col, Tab, InputGroup, Image } from "react-bootstrap";
import BetCards from "./BetCards";
import Loading from "../Utility/Loading";

export default function BetsTabs({ userBets, currentUser }) {
	const [tab, setTab] = useState({});
	const [bets, setBets] = useState([]);
	const [search, setSearch] = useState("");
	const [searchState, setSearchState] = useState(true);
	const [closingState, setClosingState] = useState(false);
	const [startingState, setStartingState] = useState(false);
	const [todayState, setTodayState] = useState(false);
	const [ncaafState, setNCAAFState] = useState(false);
	const [nflState, setNFLState] = useState(false);
	const [mlbState, setMLBState] = useState(false);
	const [nbaState, setNBAState] = useState(false);
	const [ncaabState, setNCAABState] = useState(false);
	const [nhlState, setNHLState] = useState(false);
	const [wnbaState, setWNBAState] = useState(false);
	const [mlsState, setMLSState] = useState(false);
	const [sportButtons, setSportButtons] = useState(false);
	const closingClass = closingState ? "" : "btn-outline";
	const startingClass = startingState ? "" : "btn-outline";
	const todayClass = todayState ? "" : "btn-outline";

	useEffect(() => {
		if (userBets.length !== 0) {
			setTab({ type: userBets[0].type, bets: userBets[0].bets });
		}
	}, [userBets]);

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
			filteredBetsData = tab.bets
				?.map((sport) => {
					return sport.bets;
				})
				.flat();
		} else {
			if (ncaafState) {
				const ncaafBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.details.sport === "NCAA Football";
					});
				filteredBetsData = [...filteredBetsData, ...ncaafBets];
			}
			if (nflState) {
				const nflBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.details.sport === "NFL";
					});
				filteredBetsData = [...filteredBetsData, ...nflBets];
			}
			if (mlbState) {
				const mlbBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.details.sport === "MLB";
					});
				filteredBetsData = [...filteredBetsData, ...mlbBets];
			}
			if (nbaState) {
				const nbaBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.details.sport === "NBA";
					});
				filteredBetsData = [...filteredBetsData, ...nbaBets];
			}
			if (ncaabState) {
				const ncaabBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.details.sport === "NCAA Men's Basketball";
					});
				filteredBetsData = [...filteredBetsData, ...ncaabBets];
			}
			if (nhlState) {
				const nhlBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.details.sport === "NHL";
					});
				filteredBetsData = [...filteredBetsData, ...nhlBets];
			}
			if (wnbaState) {
				const wnbaBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
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
				const closingBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.openStatus === "danger";
					});
				filteredBetsData = [...filteredBetsData, ...closingBets];
			}
			if (startingState) {
				const startingBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.openStatus === "warning";
					});
				filteredBetsData = [...filteredBetsData, ...startingBets];
			}
			if (todayState) {
				const todayBets = tab.bets
					?.map((sport) => {
						return sport.bets;
					})
					.flat()
					.filter((bet) => {
						return bet.openStatus === "info";
					});
				filteredBetsData = [...filteredBetsData, ...todayBets];
			}
		}

		const searchedBets = filteredBetsData?.filter((bet) => {
			return (
				bet?.details?.sport.toLowerCase().includes(search.toLowerCase()) ||
				bet?.details?.name.toLowerCase().includes(search.toLowerCase())
			);
		});

		if (searchedBets?.length === 0) {
			setBets(searchedBets);
			setSearchState(false);
		} else {
			setBets(searchedBets);
			setSearchState(true);
		}

		setSportButtons(
			tab?.bets?.map((sport, key) => {
				let buttonClass;
				if (sport.displayName === "NCAA Football") {
					buttonClass = ncaafState ? " btn-round" : " btn-outline btn-round";
				} else if (sport.displayName === "NFL") {
					buttonClass = nflState ? " btn-round" : " btn-outline btn-round";
				} else if (sport.displayName === "MLB") {
					buttonClass = mlbState ? " btn-round" : " btn-outline btn-round";
				} else if (sport.displayName === "NBA") {
					buttonClass = nbaState ? " btn-round" : " btn-outline btn-round";
				} else if (sport.displayName === "NCAA Men's Basketball") {
					buttonClass = ncaabState ? " btn-round" : " btn-outline btn-round";
				} else if (sport.displayName === "NHL") {
					buttonClass = nhlState ? " btn-round" : " btn-outline btn-round";
				} else if (sport.displayName === "WNBA") {
					buttonClass = wnbaState ? " btn-round" : " btn-outline btn-round";
				} else if (sport.displayName === "MLS") {
					buttonClass = mlsState ? " btn-round" : " btn-outline btn-round";
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
							<Image height={30} src={`/media/sports-icons/${sport.icon}.png`} rounded />
						</Button>
					</Col>
				);
			})
		);
	}, [
		tab.bets,
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

	// const closingSoon = bets?.some((bet) => bet.openStatus === "danger");
	// const startSoon = bets?.some((bet) => bet.openStatus === "warning");
	// const gameDay = bets?.some((bet) => bet.openStatus === "info");

	// console.log("betsTab - tab", tab);

	return tab.bets ? (
		<Row>
			{/* For lg, xl and up screens */}
			<Col className="d-none d-lg-block d-xl-block">
				<Card>
					<Tab.Container id="left-tabs-types-bets">
						<Row>
							<Col xs={2} className="mx-2">
								<Nav variant="pills" className="flex-column">
									{userBets.map((item, key) => {
										return (
											<Nav.Item
												key={key}
												onClick={() => {
													setTab(item);
												}}
											>
												<Nav.Link
													className={item.type === tab.type ? "active" : ""}
													eventKey={item.type}
												>{`${item.type} Bets`}</Nav.Link>
											</Nav.Item>
										);
									})}
								</Nav>
							</Col>
							<Col xs={9}>
								<Row className="my-3">
									<Col xs={8}>
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

									{tab.type === "Completed" ? (
										<Col xs={4}>
											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
													<Button
														type="button"
														variant="success"
														style={{ width: "1.5rem", height: "1.5rem" }}
														onClick={() => {}}
													></Button>
												</Col>
												<Col xs={7} sm={8} className="ml-1 pl-1">
													<h5 className="my-0" style={{ fontSize: 15 }}>
														{"Won"}
													</h5>
												</Col>
											</Row>
											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
													<Button
														type="button"
														variant="danger"
														style={{ width: "1.5rem", height: "1.5rem" }}
														onClick={() => {}}
													></Button>
												</Col>
												<Col xs={7} sm={8} className="ml-1 pl-1">
													<h5 className="my-0" style={{ fontSize: 15 }}>
														{"Lost"}
													</h5>
												</Col>
											</Row>
										</Col>
									) : (
										<Col xs={4}>
											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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

											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
														{"Starting Soon"}
													</h5>
												</Col>
											</Row>

											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
										</Col>
									)}
								</Row>
							</Col>
						</Row>
					</Tab.Container>
				</Card>
			</Col>

			{/* For md screens */}
			<Col className="d-none d-md-block d-lg-none">
				<Card>
					<Tab.Container id="left-tabs-types-bets">
						<Row>
							<Col xs={3} className="mx-2">
								<Nav variant="pills" className="flex-column">
									{userBets.map((item, key) => {
										return (
											<Nav.Item
												key={key}
												onClick={() => {
													setTab(item);
												}}
											>
												<Nav.Link
													className={item.type === tab.type ? "active" : ""}
													eventKey={item.type}
												>{`${item.type} Bets`}</Nav.Link>
											</Nav.Item>
										);
									})}
								</Nav>
							</Col>
							<Col xs={8}>
								<Row className="my-3">
									<Col xs={8}>
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

									{tab.type === "Completed" ? (
										<Col xs={4}>
											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
													<Button
														type="button"
														variant="success"
														style={{ width: "1.5rem", height: "1.5rem" }}
														onClick={() => {}}
													></Button>
												</Col>
												<Col xs={7} sm={8} className="ml-1 pl-1">
													<h5 className="my-0" style={{ fontSize: 15 }}>
														{"Won"}
													</h5>
												</Col>
											</Row>
											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
													<Button
														type="button"
														variant="danger"
														style={{ width: "1.5rem", height: "1.5rem" }}
														onClick={() => {}}
													></Button>
												</Col>
												<Col xs={7} sm={8} className="ml-1 pl-1">
													<h5 className="my-0" style={{ fontSize: 15 }}>
														{"Lost"}
													</h5>
												</Col>
											</Row>
										</Col>
									) : (
										<Col xs={4}>
											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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

											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
														{"Starting Soon"}
													</h5>
												</Col>
											</Row>

											<Row className="align-items-center">
												<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
										</Col>
									)}
								</Row>
							</Col>
						</Row>
					</Tab.Container>
				</Card>
			</Col>

			{/* For sm screens */}
			<Col className="d-none d-sm-block d-md-none">
				<Card>
					<Tab.Container id="left-tabs-types-bets">
						<Row>
							<Col xs={6} className="ml-2 mr-0">
								<Nav variant="pills" className="flex-column">
									{userBets.map((item, key) => {
										return (
											<Nav.Item
												key={key}
												onClick={() => {
													setTab(item);
												}}
											>
												<Nav.Link
													className={item.type === tab.type ? "active" : ""}
													eventKey={item.type}
												>{`${item.type} Bets`}</Nav.Link>
											</Nav.Item>
										);
									})}
								</Nav>
							</Col>
							<Col xs={5} className="mx-0">
								{tab.type === "Completed" ? (
									<>
										<Row className="align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
												<Button
													type="button"
													variant="success"
													style={{ width: "1.5rem", height: "1.5rem" }}
													onClick={() => {}}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="">
												<h5 className="my-0" style={{ fontSize: 15 }}>
													{"Won"}
												</h5>
											</Col>
										</Row>
										<Row className="align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
												<Button
													type="button"
													variant="danger"
													style={{ width: "1.5rem", height: "1.5rem" }}
													onClick={() => {}}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="">
												<h5 className="my-0" style={{ fontSize: 15 }}>
													{"Lost"}
												</h5>
											</Col>
										</Row>
									</>
								) : (
									<>
										<Row className="my-2 align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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

										<Row className="my-2 align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
													{"Starting Soon"}
												</h5>
											</Col>
										</Row>

										<Row className="my-2 align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
									</>
								)}
							</Col>
						</Row>

						<Row className="mx-1 my-2 justify-content-center">{sportButtons}</Row>

						<Row>
							<Col className="mx-1">
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
					</Tab.Container>
				</Card>
			</Col>

			{/* For xs screens */}
			<Col className="mx-0 px-0 d-block d-sm-none">
				<Card>
					<Tab.Container id="left-tabs-types-bets">
						<Row>
							<Col xs={6} className="ml-2 mr-0">
								<Nav variant="pills" className="flex-column">
									{userBets.map((item, key) => {
										return (
											<Nav.Item
												key={key}
												onClick={() => {
													setTab(item);
												}}
											>
												<Nav.Link
													className={item.type === tab.type ? "active" : ""}
													eventKey={item.type}
												>{`${item.type} Bets`}</Nav.Link>
											</Nav.Item>
										);
									})}
								</Nav>
							</Col>
							<Col xs={5} className="mx-0">
								{tab.type === "Completed" ? (
									<>
										<Row className="align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
												<Button
													type="button"
													variant="success"
													style={{ width: "1.5rem", height: "1.5rem" }}
													onClick={() => {}}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="">
												<h5 className="my-0" style={{ fontSize: 15 }}>
													{"Won"}
												</h5>
											</Col>
										</Row>
										<Row className="align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
												<Button
													type="button"
													variant="danger"
													style={{ width: "1.5rem", height: "1.5rem" }}
													onClick={() => {}}
												></Button>
											</Col>
											<Col xs={7} sm={8} className="">
												<h5 className="my-0" style={{ fontSize: 15 }}>
													{"Lost"}
												</h5>
											</Col>
										</Row>
									</>
								) : (
									<>
										<Row className="my-2 align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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

										<Row className="my-2 align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
													{"Starting Soon"}
												</h5>
											</Col>
										</Row>

										<Row className="my-2 align-items-center">
											<Col xs={4} sm="auto" className="mt-1 mr-0 pr-0">
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
									</>
								)}
							</Col>
						</Row>

						<Row className="mx-1 my-2 justify-content-center">{sportButtons}</Row>

						<Row>
							<Col className="mx-3">
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
					</Tab.Container>
				</Card>
			</Col>

			<Col xs={12}>
				<h4>{`${tab.type} Bets`}</h4>

				{searchState ? null : (
					<Row>
						<Col className="ml-5">
							<h2>No Bets Found.</h2>
						</Col>
					</Row>
				)}

				<BetCards tabType={tab.type} tabBets={bets} currentUser={currentUser} />
			</Col>
		</Row>
	) : (
		<Row>
			<Col className="ml-5">
				<h2>No Bets Found.</h2>
			</Col>
		</Row>
	);
}
