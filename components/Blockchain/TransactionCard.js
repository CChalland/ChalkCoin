import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Collapse, Button, InputGroup } from "react-bootstrap";

function TransactionCard({ transactionData }) {
	console.log("transactionData", transactionData);

	return (
		<Row>
			<Card>
				<Row>
					<Col xs="auto">
						<h1 className="my-0" style={{ fontSize: 24 }}>
							{transactionData.transactionId}
						</h1>
					</Col>
					<Col xs="auto">
						<h1 className="my-0" style={{ fontSize: 24 }}>
							{transactionData.sender}
						</h1>
					</Col>
					<Col xs="auto">
						<h1 className="my-0" style={{ fontSize: 24 }}>
							{transactionData.recipient}
						</h1>
					</Col>
				</Row>
			</Card>
		</Row>
	);
}

export default TransactionCard;
