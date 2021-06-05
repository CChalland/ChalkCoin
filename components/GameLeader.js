import React, { Component } from "react";
import { Container, Row, Col, Media } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	renderGameLeaders() {
		const { gameLeadersData } = this.props;

		console.log(gameLeadersData);

		return (
			<Container>
				<Row>
					<h6>{"Players to Watch"}</h6>
				</Row>
			</Container>
		);
	}

	render() {
		return this.renderGameLeaders();
	}
}

export default GameLeader;
