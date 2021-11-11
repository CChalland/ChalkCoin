import React, { useContext, useCallback, useEffect, useState } from "react";
import {
	Alert,
	Button,
	Card,
	Form,
	Collapse,
	Nav,
	Container,
	Row,
	Col,
	Tab,
	InputGroup,
	Image,
} from "react-bootstrap";
import BetCard from "../Bet/BetCard";
import axios from "axios";

function BetsTab({ userBets, currentUser }) {
	const betSorted = userBets.pendingBets?.openBets
		.map((sport) => {
			return sport.bets;
		})
		.flat();
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
	const [closingState, setClosingState] = useState(false);
	const [startingState, setStartingState] = useState(false);
	const [todayState, setTodayState] = useState(false);
	const sportButtons = userBets.pendingBets?.openBets.map((sport, key) => {
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
						}
					}}
				>
					<Image height={30} src={`../static/media/sports-icons/${sport.icon}.png`} rounded />
				</Button>
			</Col>
		);
	});
	const closingClass = closingState ? "" : "btn-outline";
	const startingClass = startingState ? "" : "btn-outline";
	const todayClass = todayState ? "" : "btn-outline";
	const betCards = bets?.map((bet, key) => {
		if (bet.event) {
			return <BetCard bet={bet} currentUser={currentUser} key={key} />;
		}
	});

	useEffect(() => {
		setOpenBets(betSorted);
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

		const searchedBets = filteredBetsData?.filter((bet) => {
			return (
				bet?.details.sport.toLowerCase().includes(search.toLowerCase()) ||
				bet?.details.name.toLowerCase().includes(search.toLowerCase())
			);
		});

		if (searchedBets?.length === 0) {
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
		closingState,
		startingState,
		todayState,
	]);

	console.log("userBets", userBets);

	return (
		<Card>
			<Card.Header>
				<Row>
					<Col xs={8}>
						<Row className="align-items-center">
							<Col xs={3}>
								<Card.Title as="h4">
									<Row className="justify-content-center">
										<Col xs={2}>
											<i className="nc-icon nc-paper-2"></i>
										</Col>
										<Col xs={8}>
											<h4 className="my-0 py-0">Your Bets</h4>
										</Col>
									</Row>
								</Card.Title>
							</Col>
							<Col xs={8} className="mt-2">
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
						<Row className="">{sportButtons}</Row>
					</Col>
					<Col xs={3}>
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
									{"Game Starting Soon"}
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
				</Row>
			</Card.Header>
			<Card.Body>
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<Nav className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="first">Received Bets</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">Open Bets</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="third">Accepted Bets</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="fourth">Completed Bets</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">Received Bets</Tab.Pane>
								<Tab.Pane eventKey="second">
									Open Bets
									{searchState ? null : <label className="error">No bets found.</label>}
									{betCards}
								</Tab.Pane>
								<Tab.Pane eventKey="third">Accepted Bets</Tab.Pane>
								<Tab.Pane eventKey="fourth">Completed Bets</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Card.Body>
		</Card>
	);
}

export default BetsTab;
