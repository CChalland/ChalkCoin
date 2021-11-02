import React, { useState, useEffect, useContext } from "react";
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
import { Doughnut } from "react-chartjs-2";
import { BetDispatch } from "../../contexts/Bets.Context";
import GameScore from "../Game/GameScore";
import axios from "axios";

function BetModal(props) {
	const { gameBetData, users, currentUser } = props;
	const dispatch = useContext(BetDispatch);
	const [modal, setModal] = useState(false);
	const [selectedWinner, setSelectedWinner] = useState("");
	const [selectedWinnerState, setSelectedWinnerState] = useState(false);
	const [currency, setCurrency] = useState("");
	const [amount, setAmount] = useState("");
	const [amountState, setAmountState] = useState(false);
	const [openButtonState, setOpenButtonState] = useState(false);
	const [recipientButtonState, setRecipientButtonState] = useState(false);
	const [betType, setBetType] = useState("");
	const [recipient, setRecipient] = useState("");
	const [recipientState, setRecipientState] = useState(false);
	const [submitBetState, setSubmitBetState] = useState(false);
	const [betButtonState, setBetButtonState] = useState(true);

	const minValue = (value, min) => min < value;
	// const data = {
	// 	datasets: [
	// 		{
	// 			data: [34.7, 65.0],
	// 			backgroundColor: [`#${gameBetData.away.color}`, `#${gameBetData.home.color}`],
	// 		},
	// 	],
	// };
	const optionsTeams = [
		{
			value: "away",
			image: gameBetData.away.logo,
			label: gameBetData.away.name,
			record: `(${gameBetData.away.records[0].summary}, ${gameBetData.away.records[1].summary} Away)`,
		},
		{
			value: "home",
			image: gameBetData.home.logo,
			label: gameBetData.home.name,
			record: `(${gameBetData.home.records[0].summary}, ${gameBetData.home.records[1].summary} Home)`,
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

	let betokenButtonClass = currency === "BEToken" ? "btn-round" : "btn-round btn-outline";
	let bitcoinButtonClass = currency === "Bitcoin" ? "btn-round" : "btn-round btn-outline";
	let openButtonClass = openButtonState ? "btn-round" : "btn-round btn-outline";
	let friendButtonClass = recipientButtonState ? "btn-round" : "btn-round btn-outline";
	let sumbitButtonClass = submitBetState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let carouselItem = gameBetData.odds?.map((betOdds, key) => {
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
						<small>{betOdds.provider.name}</small>
					</Col>
				</Row>
				<br />
			</Carousel.Item>
		);
	});

	const submitBet = async () => {
		if (submitBetState) {
			let submitBet = {
				amount,
				details: {
					displayName: gameBetData.sportName,
					id: gameBetData.id,
					date: gameBetData.date,
					name: gameBetData.name,
					winner: selectedWinner.label,
				},
				currency,
				requesterId: currentUser.id,
			};
			if (betType === "recipient") submitBet.recipientId = recipient.id;
			await axios.post("http://localhost:4000/api/createBet", submitBet).then((res) => {
				dispatch({ type: "ADD BET", bet: res.data, recipient: recipient.id });
			});
		}
	};

	useEffect(() => {
		if (
			gameBetData.status.type.completed ||
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

	return (
		<>
			{betButtonState ? (
				<Button
					className={props.buttonClassName}
					type="button"
					variant="success"
					onClick={() => setModal(!modal)}
					style={{ minWidth: "100%", width: "100%", minHeight: "100%", height: "100%" }}
				>
					<span className="btn-label">
						<i className="fas fa-plus"></i>
					</span>
					Place Bet
				</Button>
			) : null}

			{/* Modal */}
			<Modal centered size="lg" onHide={() => setModal(!modal)} show={modal}>
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
							{/* <Col xs={5} className="">
								<div className="chart-relative">
									<Doughnut data={data} height={100} width={100} options={{ cutoutPercentage: 80 }} />
									<div className="chart-absolute-center chart-text-center">
										<div className="data-chart">
											<div className="inner-circle">
												<span className="home-team">{gameBetData.home.abbreviation}</span>
												<span className="away-team">{gameBetData.away.abbreviation}</span>
											</div>
										</div>
									</div>
								</div>
							</Col> */}
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

									<Tab.Container id="bet-modal-currency" defaultActiveKey="">
										<div className="nav-container">
											<Nav className="border-0">
												<h5 className="mt-3 mr-5">Currency: </h5>
												<Nav.Link eventKey="amount-tab" className="border-0 bg-transparent">
													<Button
														className={betokenButtonClass}
														variant="default"
														onClick={() => setCurrency("BEToken")}
													>
														BEToken
													</Button>
												</Nav.Link>
												<Nav.Link eventKey="amount-tab" className="border-0 bg-transparent">
													<Button
														className={bitcoinButtonClass}
														variant="default"
														onClick={() => setCurrency("Bitcoin")}
														disabled
													>
														Bitcoin
													</Button>
												</Nav.Link>
											</Nav>
										</div>
										<Tab.Content>
											<Tab.Pane eventKey="amount-tab">
												<Row>
													<Col xs={3} lg={3} className="ml-3">
														<h5 className="">Amount: ({currency}) </h5>
													</Col>
													<Col xs={8} lg={7}>
														<Form.Group className={amountState ? "has-success" : "has-error"}>
															<InputGroup>
																<Form.Control name="curreny" type="hidden" value={currency} />
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
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>

									<Tab.Container id="bet-modal-recipient" defaultActiveKey="">
										<div className="nav-container">
											<Nav role="tablist" variant="tabs" className="border-0 nav-icons">
												<h5 className="mt-2 mr-3">Type of Bet: </h5>
												<Nav.Item>
													<Nav.Link eventKey="" className="border-0 bg-transparent">
														<Button
															className={openButtonClass}
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
															className={friendButtonClass}
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
							{/* <Col lg={3} className="d-none d-lg-block">
								<Row>
									<Col>
										<div className="chart-relative">
											<Doughnut data={data} height={100} width={100} options={{ cutoutPercentage: 80 }} />
											<div className="chart-absolute-center chart-text-center">
												<div className="data-chart">
													<div className="inner-circle">
														<span className="home-team">{gameBetData.home.abbreviation}</span>
														<span className="away-team">{gameBetData.away.abbreviation}</span>
													</div>
												</div>
											</div>
										</div>
									</Col>
								</Row>
							</Col> */}
						</Row>
					</Container>
				</Modal.Body>

				<div className="modal-footer">
					<Button
						className={sumbitButtonClass}
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
			</Modal>
		</>
	);
}

export default BetModal;
