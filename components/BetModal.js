import React, { useState } from "react";
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
	Collapse,
} from "react-bootstrap";
import GameScore from "./GameScore";

function BetModal(props) {
	const { gameScoreCardData, betModalData } = props;
	const [modal, setModal] = useState(false);
	const [currency, setCurrency] = useState("");
	const [amount, setAmount] = useState("");
	const [amountState, setAmountState] = useState(true);
	const [openButtonState, setOpenButtonState] = useState(false);
	const [recipientButtonState, setRecipientButtonState] = useState(false);
	const [betType, setBetType] = useState("");
	const [recipient, setRecipient] = useState("");
	const [recipientState, setRecipientState] = useState(true);

	let betokenButtonClass = currency === "BEToken" ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let bitcoinButtonClass = currency === "Bitcoin" ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let openButtonClass = openButtonState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";
	let friendButtonClass = recipientButtonState ? "btn-round btn-wd" : "btn-round btn-wd btn-outline";

	const minValue = (value, min) => min < value;
	// const recipientFind = ();

	let carouselItem = betModalData?.map((betOdds, key) => {
		return (
			<Carousel.Item>
				<Row className="justify-content-center">
					<p>TESTING</p>
				</Row>
			</Carousel.Item>
		);
	});

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

				<Modal.Body className="text-center">
					<Container fluid>
						<Form action="" className="form-horizontal" id="RangeValidation" method="">
							<p>Infavor to win</p>

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
											<Form.Label column sm="2">
												Amount: ({currency})
											</Form.Label>
											<Col sm="7">
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
											<Form.Label column sm="2">
												Recipient:
											</Form.Label>
											<Col sm="7">
												<Form.Group className={recipientState ? "has-success" : "has-error"}>
													<Form.Control name="type" type="hidden" value={betType} />
													<InputGroup>
														<InputGroup.Prepend>
															<InputGroup.Text>
																<i className="nc-icon nc-zoom-split"></i>
															</InputGroup.Text>
														</InputGroup.Prepend>
														<Form.Control
															name="recipient"
															value={recipient}
															type="text"
															onChange={(e) => {
																setRecipient(e.target.value);
																if (maxLength(e.target.value, 5)) {
																	setRecipientState(true);
																} else {
																	setRecipientState(false);
																}
															}}
															placeholder="Search here.."
														/>
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
					<Button className="btn-simple" onClick={() => setModal(!modal)} variant="link">
						Back
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
