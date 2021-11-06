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
			{/* For md, lg, xl and up screens */}
			<Col className="d-none d-md-block d-xl-block">
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card className="my-0 py-0">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col md={3}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
								<Col md={8}>
									<Row className="justify-content-between">
										<Col md={5}>
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												Sender
											</h4>
										</Col>
										<Col md={5}>
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												Recipient
											</h4>
										</Col>
									</Row>
								</Col>
								<Col md={1} className="mx-0 px-0">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Amount
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="mt-0 pt-0">
							<Row className="align-items-center">
								<Col md={3}>
									<h1 className="my-0" style={{ fontSize: 20 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
								<Col md={8}>
									<Row className="align-items-center">
										<Col md={5} className="">
											<h1 className="my-0 text-danger" style={{ fontSize: 20 }}>
												{transactionData.sender}
											</h1>
										</Col>
										<Col md={2} className="ml-0 pl-0">
											<Image height={35} src="../../static/media/arrow.png" />
										</Col>
										<Col md={5}>
											<h1 className="my-0 text-success" style={{ fontSize: 20 }}>
												{transactionData.recipient}
											</h1>
										</Col>
									</Row>
								</Col>
								<Col md={1} className="mx-0 px-0">
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

			{/* For xs & sm screens */}
			<Col className="mx-0 px-0 d-block d-md-none">
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card className="my-0 py-0">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col xs={12}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="mt-0 pt-0">
							<Row className="text-center">
								<Col xs={12}>
									<h1 className="my-0" style={{ fontSize: 24 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
							</Row>
							<Row className="mt-2 pt-2">
								<Col xs={12}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Sender
									</h4>
								</Col>
							</Row>
							<Row className="text-center">
								<Col>
									<h1 className="mt-0 text-danger" style={{ fontSize: 20 }}>
										{transactionData.sender}
									</h1>
								</Col>
							</Row>
							<Row className="my-0 py-0">
								<Col xs={{ span: 1, offset: 4 }}>
									<Image height={40} src="../../static/media/arrow_down.png" />
								</Col>
								<Col xs={2}>
									<h1 className="my-0" style={{ fontSize: 36 }}>
										${transactionData.amount}
									</h1>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Recipient
									</h4>
								</Col>
							</Row>
							<Row className="text-center">
								<Col>
									<h1 className="mt-0 text-success" style={{ fontSize: 20 }}>
										{transactionData.recipient}
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
