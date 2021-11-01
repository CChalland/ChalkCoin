import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Collapse, Button, InputGroup } from "react-bootstrap";

function TransactionCard(props) {
	return (
		<Card>
			<Row>
				<Col xs="auto">Transaction ID</Col>
				<Col xs="auto">Sender</Col>
				<Col xs="auto">Amount</Col>
			</Row>
		</Card>
	);
}

export default TransactionCard;
