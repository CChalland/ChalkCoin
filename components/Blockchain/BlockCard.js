import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Collapse, Button, InputGroup } from "react-bootstrap";

function BlockCard(props) {
	return (
		<Card>
			<Row>
				<Col xs="auto">BLock ID</Col>
				<Col xs="auto">Hash</Col>
				<Col xs="auto"># of Transactions</Col>
				<Col xs="auto">Total $ sent</Col>
				<Col xs="auto">Total $ fees</Col>
				<Col xs="auto">size?</Col>
			</Row>
		</Card>
	);
}

export default BlockCard;
