import React, { useContext, useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Form, Collapse, Nav, Container, Row, Col, Tab } from "react-bootstrap";
import axios from "axios";

function BetsTab({ userBets }) {
	console.log("userBets", userBets);

	return (
		<Card>
			<Card.Header>
				<Card.Title as="h4">
					<i className="nc-icon nc-paper-2"></i> Your Bets
				</Card.Title>
				<p className="category">Here is some text</p>
			</Card.Header>
			<Card.Body>
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<Nav className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="first">Tab 1</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">Tab 2</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">afdfadfadfadsfdfadfasdfafdas</Tab.Pane>
								<Tab.Pane eventKey="second">afdfadfadfadsfdfadfasdfafdas</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Card.Body>
		</Card>
	);
}

export default BetsTab;
