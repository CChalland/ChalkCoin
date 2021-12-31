import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import {
	Container,
	Col,
	Row,
	Button,
	Modal,
	Carousel,
	Tab,
	Nav,
	Form,
	InputGroup,
	Image,
} from "react-bootstrap";
import Select, { components } from "react-select";
import { BetDispatch } from "../../contexts/Bets.Context";
import GameScore from "./GameScore";
import OddsChart from "../Utility/OddsChart";
import axios from "axios";

const minValue = (value, min) => min < value;

function BetModal({ gameBetData, users, currentUser, buttonClassName }) {
	const router = useRouter();
	const dispatch = useContext(BetDispatch);
	const [modal, setModal] = useState(false);
	const [selectedWinner, setSelectedWinner] = useState("");
	const [selectedWinnerState, setSelectedWinnerState] = useState(false);
	const [amount, setAmount] = useState("");
	const [amountState, setAmountState] = useState(false);
	const [openButtonState, setOpenButtonState] = useState(false);
	const [recipientButtonState, setRecipientButtonState] = useState(false);
	const [betType, setBetType] = useState("");
	const [recipient, setRecipient] = useState("");
	const [recipientState, setRecipientState] = useState(false);
	const [submitBetState, setSubmitBetState] = useState(false);
	const [betButtonState, setBetButtonState] = useState(true);
	const [disabledState, setDisabledState] = useState(true);
	const optionsTeams = [
		{
			value: "away",
			image: gameBetData.away.logo,
			label: gameBetData.away.name,
			record: `(${gameBetData.away.records ? gameBetData.away.records[0].summary : ""}, ${
				gameBetData.away.records ? gameBetData.away.records[1].summary : ""
			} Away)`,
		},
		{
			value: "home",
			image: gameBetData.home.logo,
			label: gameBetData.home.name,
			record: `(${gameBetData.home.records ? gameBetData.home.records[0].summary : ""}, ${
				gameBetData.home.records ? gameBetData.home.records[1].summary : ""
			} Home)`,
		},
	];
	const optionsUsers = users.map((user) => {
		return {
			id: user.id,
			value: user.username,
			image: user.image,
			label: user.name,
		};
	});
	const ToWinOption = (props) => (
		<components.Option {...props}>
			<Row className="align-items-center">
				<Col xs="auto">
					<Image width={35} height={35} src={props.data.image} rounded />
				</Col>
				<Col>
					<Row>{props.data.label}</Row>
					<Row className="text-muted">
						<small>{props.data.record}</small>
					</Row>
				</Col>
			</Row>
		</components.Option>
	);
	const UserOption = (props) => (
		<components.Option {...props}>
			<Row className="align-items-center">
				<Col xs="auto">
					<Image width={35} height={35} src={props.data.image} roundedCircle />
				</Col>
				<Col>
					<Row>{props.data.value}</Row>
					<Row className="text-muted">
						<small>{props.data.label}</small>
					</Row>
				</Col>
			</Row>
		</components.Option>
	);
	const carouselItem = gameBetData.odds?.map((betOdds, key) => {
		return (
			<Carousel.Item key={key}>
				<Row className="justify-content-center">
					<Col xs={4}>{"Details: "}</Col>
					<Col>{betOdds.details}</Col>
				</Row>
				<Row className="justify-content-center">
					<Col xs={4}>{"O/U: "}</Col>
					<Col>{betOdds.overUnder}</Col>
				</Row>
				<Row className="justify-content-center">
					<Col xs={4}>
						<small>{"Provider: "}</small>
					</Col>
					<Col>
						<small>{betOdds.title}</small>
					</Col>
				</Row>
				<br />
			</Carousel.Item>
		);
	});
	const betButton = betButtonState ? (
		<Button
			className="btn-wd"
			disabled={disabledState}
			type="button"
			variant="success"
			onClick={() => setModal(!modal)}
			style={{ minWidth: "100%", minHeight: "100%", pointerEvents: "auto" }}
		>
			<span className="btn-label">
				<i className="fas fa-plus"></i>
			</span>
			Place Bet
		</Button>
	) : (
		""
	);

	const submitBet = async () => {
		if (submitBetState) {
			let submitBet = {
				amount,
				details: {
					sport: gameBetData.sportName,
					gameId: gameBetData.id,
					date: gameBetData.date,
					name: gameBetData.name,
					winner: selectedWinner.label,
				},
				currency: "ChalkCoin",
				requesterId: currentUser.id,
			};
			if (betType === "recipient") submitBet.recipientId = recipient.id;
			const res = await axios.post(`/api/createBet`, submitBet);
			if (res.data.error) {
				router.push(
					{
						pathname: router.pathname,
						query: { ...router.query, error: res.data.message },
					},
					undefined,
					{ shallow: true }
				);
			} else if (res.data) {
				dispatch({ type: "ADD BET", bet: res.data, recipient: recipient.id });
			}
			setSelectedWinner("");
			setSelectedWinnerState(false);
			setRecipientButtonState(false);
			setOpenButtonState(false);
			setBetType("");
			setRecipient("");
			setAmount("");
		}
	};

	useEffect(() => {
		if (
			gameBetData.status.type.state === "post" ||
			(gameBetData.status.type.state === "in" && gameBetData.status.period > 1)
		)
			setBetButtonState(false);
		else setBetButtonState(true);
	}, [gameBetData]);

	useEffect(() => {
		if (selectedWinner && amount && amountState && recipient && recipientState) {
			setSubmitBetState(true);
		} else if (selectedWinner && amount && amountState && openButtonState) {
			setSubmitBetState(true);
		} else {
			setSubmitBetState(false);
		}
	}, [selectedWinnerState, amountState, openButtonState, recipientState]);

	useEffect(() => {
		if (currentUser.id) setDisabledState(false);
		else setDisabledState(true);
	}, [currentUser]);

	return (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			{betButton}
			<Row className="">
				{/* Modal */}
				<Modal className="" centered size="lg" onHide={() => setModal(!modal)} show={modal}>
					{/* For sm, lg, xl and up screens */}
					<Col className="d-none d-sm-block d-xl-block">
						<Modal.Header closeButton>
							<Container>
								<Row className="justify-content-md-center">
									<Col xs={12} lg={8} className="border">
										<GameScore gameScoreCardData={gameBetData} />
									</Col>
									{carouselItem ? (
										<Col lg={4} className="d-none d-lg-block">
											<Carousel controls={false} fade>
												{carouselItem}
											</Carousel>
										</Col>
									) : null}
								</Row>
							</Container>
						</Modal.Header>

						<Modal.Body className="">
							<Container fluid>
								<Row className="d-lg-none justify-content-md-center">
									{carouselItem ? (
										<Col className="">
											<Carousel controls={false} fade>
												{carouselItem}
											</Carousel>
										</Col>
									) : null}
									<Col xs={5} className="">
										<OddsChart
											home={gameBetData.home}
											away={gameBetData.away}
											awayWinProb={gameBetData.away.winProbability}
											homeWinProb={gameBetData.home.winProbability}
										/>
									</Col>
								</Row>
								<Row className="justify-content-md-center">
									<Col xs={12} lg={8}>
										<Form className="form-horizontal" id="RangeValidation">
											<Row>
												<h5 className="mt-2 mx-3">Select Winner: </h5>
												<Col>
													<Form.Group className={selectedWinnerState ? "has-success" : "has-error"}>
														<InputGroup>
															<InputGroup.Prepend>
																<InputGroup.Text>
																	<i className="nc-icon nc-zoom-split"></i>
																</InputGroup.Text>
															</InputGroup.Prepend>
															<Col xs={9} className="mx-0 px-0">
																<Select
																	className="react-select primary"
																	classNamePrefix="react-select"
																	name="selectedWinner"
																	value={selectedWinner}
																	onChange={(value) => {
																		setSelectedWinner(value);
																		setSelectedWinnerState(true);
																	}}
																	options={optionsTeams}
																	placeholder="Search Team"
																	components={{ Option: ToWinOption }}
																/>
															</Col>
														</InputGroup>
													</Form.Group>
												</Col>
											</Row>

											<Row>
												<h5 className="mt-2 mx-3">Amount: </h5>
												<Col>
													<Form.Group className={amountState ? "has-success" : "has-error"}>
														<InputGroup>
															<InputGroup.Text>$</InputGroup.Text>
															<InputGroup.Text>{"0.00"}</InputGroup.Text>
															<Form.Control
																name="amount"
																type="text"
																value={amount}
																onChange={(e) => {
																	setAmount(e.target.value);
																	if (minValue(e.target.value, 0)) {
																		setAmountState(true);
																	} else {
																		setAmountState(false);
																	}
																}}
																placeholder="Amount"
															/>
														</InputGroup>
														{amountState ? null : (
															<label className="error">Bet must be over value of 0.</label>
														)}
													</Form.Group>
												</Col>
											</Row>

											<Tab.Container id="bet-modal-recipient" defaultActiveKey="">
												<div className="nav-container">
													<Nav role="tablist" variant="tabs" className="border-0 nav-icons">
														<h5 className="mt-2 mr-3">Type of Bet: </h5>
														<Nav.Item>
															<Nav.Link eventKey="" className="border-0 bg-transparent">
																<Button
																	className={openButtonState ? "btn-round" : "btn-round btn-outline"}
																	variant="default"
																	onClick={() => {
																		setRecipientButtonState(false);
																		setOpenButtonState(true);
																		setBetType("open");
																		setRecipient("");
																	}}
																>
																	Open Bet
																</Button>
															</Nav.Link>
														</Nav.Item>
														<Nav.Item>
															<Nav.Link eventKey="find-user-tab" className="border-0 bg-transparent">
																<Button
																	className={recipientButtonState ? "btn-round" : "btn-round btn-outline"}
																	variant="default"
																	onClick={() => {
																		setRecipientButtonState(true);
																		setOpenButtonState(false);
																		setBetType("recipient");
																	}}
																>
																	Bet w/ Friend
																</Button>
															</Nav.Link>
														</Nav.Item>
													</Nav>
												</div>
												<Tab.Content>
													<Tab.Pane eventKey="find-user-tab">
														<Row>
															<Col xs={3} lg={3} className="ml-3">
																<h5 className="mt-2">Recipient: </h5>
															</Col>
															<Col>
																<Form.Group className={recipientState ? "has-success" : "has-error"}>
																	<Form.Control name="type" type="hidden" value={betType} />
																	<InputGroup>
																		<InputGroup.Prepend>
																			<InputGroup.Text>
																				<i className="nc-icon nc-single-02"></i>
																			</InputGroup.Text>
																		</InputGroup.Prepend>
																		<Col xs={9} lg={9} className="mx-0 px-0">
																			<Select
																				className="react-select primary"
																				classNamePrefix="react-select"
																				name="recipient"
																				value={recipient}
																				onChange={(value) => {
																					setRecipient(value);
																					setRecipientState(true);
																				}}
																				options={optionsUsers}
																				placeholder="Search Username"
																				components={{ Option: UserOption }}
																			/>
																		</Col>
																	</InputGroup>
																</Form.Group>
															</Col>
														</Row>
													</Tab.Pane>
												</Tab.Content>
											</Tab.Container>
										</Form>
									</Col>
									<Col lg={3} className="d-none d-lg-block">
										<Row>
											<Col>
												<OddsChart
													home={gameBetData.home}
													away={gameBetData.away}
													awayWinProb={gameBetData.away.winProbability}
													homeWinProb={gameBetData.home.winProbability}
												/>
											</Col>
										</Row>
									</Col>
								</Row>
							</Container>
						</Modal.Body>

						<div className="modal-footer">
							<Button
								className={submitBetState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline"}
								variant="success"
								disabled={!submitBetState}
								onClick={() => {
									setModal(!modal);
									submitBet();
								}}
							>
								Send Bet
							</Button>
							<Button className="btn-simple" onClick={() => setModal(!modal)} variant="link">
								Close
							</Button>
						</div>
					</Col>

					{/* For xs screen */}
					<Col className="d-block d-sm-none">
						<Modal.Header closeButton>
							<Container>
								<Row className="justify-content-md-center">
									<Col xs={12} lg={8} className="border">
										<GameScore gameScoreCardData={gameBetData} screenSize="modal" />
									</Col>
									{carouselItem ? (
										<Col lg={4} className="d-none d-lg-block">
											<Carousel controls={false} fade>
												{carouselItem}
											</Carousel>
										</Col>
									) : null}
								</Row>
							</Container>
						</Modal.Header>

						<Modal.Body className="">
							<Container fluid>
								<Row className="d-lg-none justify-content-md-center">
									{carouselItem ? (
										<Col className="">
											<Carousel controls={false} fade>
												{carouselItem}
											</Carousel>
										</Col>
									) : null}
									<Col xs={5} className="">
										<OddsChart
											home={gameBetData.home}
											away={gameBetData.away}
											awayWinProb={gameBetData.away.winProbability}
											homeWinProb={gameBetData.home.winProbability}
										/>
									</Col>
								</Row>
								<Row className="justify-content-md-center">
									<Col xs={12} lg={8}>
										<Form className="form-horizontal" id="RangeValidation">
											<Row>
												<Col>
													<Form.Group className={selectedWinnerState ? "has-success" : "has-error"}>
														<InputGroup>
															<InputGroup.Prepend>
																<InputGroup.Text>
																	<i className="nc-icon nc-zoom-split"></i>
																</InputGroup.Text>
															</InputGroup.Prepend>
															<Col xs={9} className="mx-0 px-0">
																<Select
																	className="react-select primary"
																	classNamePrefix="react-select"
																	name="selectedWinner"
																	value={selectedWinner}
																	onChange={(value) => {
																		setSelectedWinner(value);
																		setSelectedWinnerState(true);
																	}}
																	options={optionsTeams}
																	placeholder="Team"
																	components={{ Option: ToWinOption }}
																/>
															</Col>
														</InputGroup>
													</Form.Group>
												</Col>
											</Row>

											<Row>
												<Col>
													<Form.Group className={amountState ? "has-success" : "has-error"}>
														<InputGroup>
															<InputGroup.Text>$</InputGroup.Text>
															<InputGroup.Text>{"0.00"}</InputGroup.Text>
															<Form.Control
																name="amount"
																type="text"
																value={amount}
																onChange={(e) => {
																	setAmount(e.target.value);
																	if (minValue(e.target.value, 0)) {
																		setAmountState(true);
																	} else {
																		setAmountState(false);
																	}
																}}
																placeholder="Amount"
															/>
														</InputGroup>
														{amountState ? null : (
															<label className="error">Bet must be over value of 0.</label>
														)}
													</Form.Group>
												</Col>
											</Row>

											<Tab.Container id="bet-modal-recipient" defaultActiveKey="">
												<div className="nav-container">
													<Nav role="tablist" variant="tabs" className="border-0 nav-icons">
														<Row>
															<Nav.Item>
																<Nav.Link eventKey="" className="mx-1 px-0 border-0 bg-transparent">
																	<Button
																		className={openButtonState ? "btn-round" : "btn-round btn-outline"}
																		variant="default"
																		onClick={() => {
																			setRecipientButtonState(false);
																			setOpenButtonState(true);
																			setBetType("open");
																			setRecipient("");
																		}}
																	>
																		Open Bet
																	</Button>
																</Nav.Link>
															</Nav.Item>
															<Nav.Item>
																<Nav.Link
																	eventKey="find-user-tab"
																	className="mx-1 px-0 border-0 bg-transparent"
																>
																	<Button
																		className={recipientButtonState ? "btn-round" : "btn-round btn-outline"}
																		variant="default"
																		onClick={() => {
																			setRecipientButtonState(true);
																			setOpenButtonState(false);
																			setBetType("recipient");
																		}}
																	>
																		Bet w/ Friend
																	</Button>
																</Nav.Link>
															</Nav.Item>
														</Row>
													</Nav>
												</div>
												<Tab.Content>
													<Tab.Pane eventKey="find-user-tab">
														<Row>
															<Col xs={12} className="ml-3">
																<h5 className="mt-2">Recipient: </h5>
															</Col>
															<Col xs={12}>
																<Form.Group className={recipientState ? "has-success" : "has-error"}>
																	<Form.Control name="type" type="hidden" value={betType} />
																	<InputGroup>
																		<InputGroup.Prepend>
																			<InputGroup.Text>
																				<i className="nc-icon nc-single-02"></i>
																			</InputGroup.Text>
																		</InputGroup.Prepend>
																		<Col xs={9} lg={9} className="mx-0 px-0">
																			<Select
																				className="react-select primary"
																				classNamePrefix="react-select"
																				name="recipient"
																				value={recipient}
																				onChange={(value) => {
																					setRecipient(value);
																					setRecipientState(true);
																				}}
																				options={optionsUsers}
																				placeholder="Username"
																				components={{ Option: UserOption }}
																			/>
																		</Col>
																	</InputGroup>
																</Form.Group>
															</Col>
														</Row>
													</Tab.Pane>
												</Tab.Content>
											</Tab.Container>
										</Form>
									</Col>
									<Col lg={3} className="d-none d-lg-block">
										<Row>
											<Col>
												<OddsChart
													home={gameBetData.home}
													away={gameBetData.away}
													awayWinProb={gameBetData.away.winProbability}
													homeWinProb={gameBetData.home.winProbability}
												/>
											</Col>
										</Row>
									</Col>
								</Row>
							</Container>
						</Modal.Body>

						<div className="modal-footer mt-3">
							<Button
								className={submitBetState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline"}
								variant="success"
								disabled={!submitBetState}
								onClick={() => {
									setModal(!modal);
									submitBet();
								}}
							>
								Send Bet
							</Button>
							<Button className="btn-simple" onClick={() => setModal(!modal)} variant="link">
								Close
							</Button>
						</div>
					</Col>
				</Modal>
			</Row>
		</>
	);
}

export default BetModal;
