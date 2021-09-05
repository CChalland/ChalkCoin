import React, { useState } from "react";
import { Container, Col, Row, Button, Modal, Carousel, Tab, Nav, Collapse } from "react-bootstrap";
import GameScore from "./GameScore";

function BetModal(props) {
	const [modal, setModal] = useState(false);
	const { gameScoreCardData, betModalData } = props;

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
					<p>Infavor to win</p>

					<Tab.Container id="bet-modal-currency" defaultActiveKey="betoken-currency-tab">
						<div className="nav-container">
							<Nav role="tablist" variant="tabs" className="justify-content-center border-0 nav-icons">
								<Nav.Item>
									<Nav.Link eventKey="betoken-currency-tab" className="border-0 bg-transparent">
										<Button className="btn-outline btn-round btn-wd mr-1" variant="default">
											BEToken
										</Button>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="bitcoin-currency-tab" className="border-0 bg-transparent">
										<Button className="btn-outline btn-round btn-wd mr-1" variant="default">
											Bitcoin
										</Button>
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</div>
						<Tab.Content>
							<Tab.Pane eventKey="betoken-currency-tab">
								<h6>Amount (BEToken)</h6>ValueBox
							</Tab.Pane>
							<Tab.Pane eventKey="bitcoin-currency-tab">
								<h6>Amount (Bitcoin)</h6>ValueBox
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>

					<p>Recipient (Collapse?)</p>
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
