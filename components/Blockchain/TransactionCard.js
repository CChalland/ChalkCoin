import React, { useState } from "react";
import { Container, Row, Col, Card, Collapse, Button, Image } from "react-bootstrap";
import GameCard from "../Game/GameCard";

function TransactionCard({ transactionData, panelKey }) {
	const [multipleExpandablePanels, setMultipleExpandablePanels] = useState([]);
	const toggleMultipleExpandablePanels = (event, value) => {
		if (multipleExpandablePanels.includes(value)) {
			setMultipleExpandablePanels(multipleExpandablePanels.filter((prop) => prop !== value));
		} else {
			setMultipleExpandablePanels([...multipleExpandablePanels, value]);
		}
	};

	// console.log("transactionData", transactionData);

	return (
		<Row className="my-3">
			{/* For extra lage screen */}
			<Col className="d-none d-xl-block">
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card className="my-0 py-0">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
								<Col xs={8}>
									<Row className="justify-content-between">
										<Col xs={5}>
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												Sender
											</h4>
										</Col>
										<Col xs={5}>
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												Recipient
											</h4>
										</Col>
									</Row>
								</Col>
								<Col xs={1}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Amount
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h1 className="my-0" style={{ fontSize: 20 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
								<Col xs={8}>
									<Row className="align-items-center">
										<Col xs={5}>
											<h1 className="my-0" style={{ fontSize: 20 }}>
												{transactionData.sender}
											</h1>
										</Col>
										<Col xs={2}>
											<Image height={35} src="../../static/media/arrow_cartoon.png" />
										</Col>
										<Col xs={5}>
											<h1 className="my-0" style={{ fontSize: 20 }}>
												{transactionData.recipient}
											</h1>
										</Col>
									</Row>
								</Col>
								<Col xs={1}>
									<h1 className="my-0" style={{ fontSize: 36 }}>
										${transactionData.amount}
									</h1>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
				<Collapse className="collapse my-0 py-0" id="collapseOne" in={multipleExpandablePanels.includes(1)}>
					<Col>
						<GameCard
							panelKey={panelKey}
							gameData={transactionData.event}
							sportName={transactionData.details.sport}
							users={[]}
							currentUser={[]}
						/>
					</Col>
				</Collapse>
			</Col>
			{/* For large screen */}
			<Col className="mx-0 px-0 d-none d-lg-block d-xl-none">
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card className="my-0 py-0">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h1 className="my-0" style={{ fontSize: 20 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
				<Collapse className="collapse my-0 py-0" id="collapseOne" in={multipleExpandablePanels.includes(1)}>
					<Col>
						<GameCard
							panelKey={panelKey}
							gameData={transactionData.event}
							sportName={transactionData.details.sport}
							users={[]}
							currentUser={[]}
						/>
					</Col>
				</Collapse>
			</Col>

			{/* For medium screen */}
			<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card className="my-0 py-0">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h1 className="my-0" style={{ fontSize: 20 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
				<Collapse className="collapse my-0 py-0" id="collapseOne" in={multipleExpandablePanels.includes(1)}>
					<Col>
						<GameCard
							panelKey={panelKey}
							gameData={transactionData.event}
							sportName={transactionData.details.sport}
							users={[]}
							currentUser={[]}
						/>
					</Col>
				</Collapse>
			</Col>

			{/* For small screen */}
			<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card className="my-0 py-0">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h1 className="my-0" style={{ fontSize: 20 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
				<Collapse className="collapse my-0 py-0" id="collapseOne" in={multipleExpandablePanels.includes(1)}>
					<Col>
						<GameCard
							panelKey={panelKey}
							gameData={transactionData.event}
							sportName={transactionData.details.sport}
							users={[]}
							currentUser={[]}
						/>
					</Col>
				</Collapse>
			</Col>

			{/* For xs screen */}
			<Col className="mx-0 px-0 d-block d-sm-none">
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card className="my-0 py-0">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={3}>
									<h1 className="my-0" style={{ fontSize: 20 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
				<Collapse className="collapse my-0 py-0" id="collapseOne" in={multipleExpandablePanels.includes(1)}>
					<Col>
						<GameCard
							panelKey={panelKey}
							gameData={transactionData.event}
							sportName={transactionData.details.sport}
							users={[]}
							currentUser={[]}
						/>
					</Col>
				</Collapse>
			</Col>
		</Row>
	);
}

export default TransactionCard;
