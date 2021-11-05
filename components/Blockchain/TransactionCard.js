import React, { useState } from "react";
import { Container, Row, Col, Card, Collapse, Button, InputGroup } from "react-bootstrap";
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

	console.log("transactionData", transactionData);

	return (
		<Row>
			<div>
				<a
					style={{ cursor: "pointer" }}
					data-toggle="collapse"
					aria-expanded={multipleExpandablePanels.includes(1)}
					onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
				>
					<Card>
						<Card.Header className="my-0 py-0">
							<Row>
								<Col xs="auto">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transaction ID
									</h4>
								</Col>
								<Col xs="auto">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Sender
									</h4>
								</Col>
								<Col xs="auto">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Recipient
									</h4>
								</Col>
								<Col xs="auto">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Amount
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="my-0 py-0">
							<Row>
								<Col xs="auto">
									<h1 className="" style={{ fontSize: 24 }}>
										{transactionData.transactionId}
									</h1>
								</Col>
								<Col xs="auto">
									<h1 className="" style={{ fontSize: 24 }}>
										{transactionData.sender}
									</h1>
								</Col>
								<Col xs="auto">
									<h1 className="" style={{ fontSize: 24 }}>
										{transactionData.recipient}
									</h1>
								</Col>
								<Col xs="auto">
									<h1 className="" style={{ fontSize: 24 }}>
										${transactionData.amount}
									</h1>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
				<Collapse className="collapse" id="collapseOne" in={multipleExpandablePanels.includes(1)}>
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
			</div>
		</Row>
	);
}

export default TransactionCard;
