import React, { useState, useEffect } from "react";
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
import GameScore from "./GameScore";

function BetModal(props) {
	const { gameScoreCardData, betModalData, users } = props;
	const [modal, setModal] = useState(false);
	const [infavorToWin, setInfavorToWin] = useState("");
	const [infavorToWinState, setInfavorToWinState] = useState(false);
	const [currency, setCurrency] = useState("");
	const [amount, setAmount] = useState(0);
	const [amountState, setAmountState] = useState(true);
	const [openButtonState, setOpenButtonState] = useState(false);
	const [recipientButtonState, setRecipientButtonState] = useState(false);
	const [betType, setBetType] = useState("");
	const [recipient, setRecipient] = useState("");
	const [recipientState, setRecipientState] = useState(false);
	const [submitBetState, setSubmitBetState] = useState(false);

	const minValue = (value, min) => min < value;
	const optionsTeams = [
		{
			value: "away",
			image: gameScoreCardData.away.logo,
			label: gameScoreCardData.away.name,
			record: `(${gameScoreCardData.away.records[0].summary}, ${gameScoreCardData.away.records[1].summary} Away)`,
		},
		{
			value: "home",
			image: gameScoreCardData.home.logo,
			label: gameScoreCardData.home.name,
			record: `(${gameScoreCardData.home.records[0].summary}, ${gameScoreCardData.home.records[1].summary} Home)`,
		},
	];
	const optionsUsers = users.map((user) => {
		return {
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

	let betokenButtonClass = currency === "BEToken" ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let bitcoinButtonClass = currency === "Bitcoin" ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let openButtonClass = openButtonState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let friendButtonClass = recipientButtonState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let sumbitButtonClass = submitBetState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let carouselItem = betModalData?.map((betOdds, key) => {
		console.log(betOdds);
		return (
			<Carousel.Item key={key}>
				<Row className="justify-content-center">
					<p>TESTING</p>
				</Row>
			</Carousel.Item>
		);
	});

	useEffect(() => {
		if (infavorToWin && amount && amountState && recipient && recipientState) {
			setSubmitBetState(true);
		} else if (infavorToWin && amount && amountState && openButtonState) {
			setSubmitBetState(true);
		} else {
			setSubmitBetState(false);
		}
	}, [infavorToWinState, amountState, openButtonState, recipientState]);

	return (
		<>
			<Button
				className={props.buttonClassName}
				type="button"
				variant="success"
				onClick={() => setModal(!modal)}
				style={{ minWidth: "100%", width: "100%", minHeight: "100%", height: "100%" }}
			>
				<span className="btn-label">
					<i className="fas fa-check"></i>
				</span>
				Place Bet
			</Button>

			{/* Modal */}
			<Modal centered size="lg" onHide={() => setModal(!modal)} show={modal}>
				<Modal.Header closeButton>
					<Container>
						<Row>
							<Col md={12} lg={8} className="border">
								<GameScore gameScoreCardData={gameScoreCardData} />
							</Col>
							<Col>
								{carouselItem ? <Carousel fade>{carouselItem}</Carousel> : <h6>NO ODDS ON RECORD</h6>}
							</Col>
						</Row>
					</Container>
				</Modal.Header>

				<Modal.Body className="">
					<Container fluid>
						<Form action="" className="form-horizontal" id="RangeValidation" method="">
							<Row>
								<h5 className="mt-2 mx-3">Select Winner: </h5>
								<Col>
									<Form.Group className={infavorToWinState ? "has-success" : "has-error"}>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text>
													<i className="nc-icon nc-zoom-split"></i>
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Col xs={6} className="mx-0 px-0">
												<Select
													className="react-select primary"
													classNamePrefix="react-select"
													name="infavorToWin"
													value={infavorToWin}
													onChange={(value) => {
														setInfavorToWin(value);
														setInfavorToWinState(true);
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
									<Nav role="tablist" variant="tabs" className="border-0 nav-icons">
										<h5 className="mt-2 mr-5">Currency: </h5>
										<Nav.Item>
											<Nav.Link eventKey="amount-tab" className="border-0 bg-transparent">
												<Button
													className={betokenButtonClass}
													variant="default"
													onClick={() => setCurrency("BEToken")}
												>
													BEToken
												</Button>
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="amount-tab" className="border-0 bg-transparent">
												<Button
													className={bitcoinButtonClass}
													variant="default"
													onClick={() => setCurrency("Bitcoin")}
												>
													Bitcoin
												</Button>
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</div>
								<Tab.Content>
									<Tab.Pane eventKey="amount-tab">
										<Row>
											<Col sm="2" className="mr-3">
												<h5 className="pl-5">Amount: ({currency}) </h5>
											</Col>
											<Col sm="6">
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
													{amountState ? null : <label className="error">Bet must be over value of 0.</label>}
												</Form.Group>
											</Col>
										</Row>
									</Tab.Pane>
								</Tab.Content>
							</Tab.Container>

							<Tab.Container id="bet-modal-recipient" defaultActiveKey="">
								<div className="nav-container">
									<Nav role="tablist" variant="tabs" className="border-0 nav-icons">
										<h5 className="mt-2 mr-4">Type of Bet: </h5>
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
											<Col sm="2" className="mr-3">
												<h5 className="mt-2 pl-5">Recipient: </h5>
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
														<Col xs={6} className="mx-0 px-0">
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
					</Container>
				</Modal.Body>

				<div className="modal-footer">
					<Button
						className={sumbitButtonClass}
						variant="success"
						disabled={!submitBetState}
						onClick={() => setModal(!modal)}
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
