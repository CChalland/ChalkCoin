import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	renderGameLeaders() {
		const { gameLeadersData } = this.props;

		console.log(gameLeadersData);

		return <div>{"TOP PERFORMERS"}</div>;
	}

	render() {
		return this.renderGameLeaders();
	}
}

export default GameLeader;
