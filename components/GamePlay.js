import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class GamePlay extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderGamePlays() {
		const { gamePlayData } = this.props;

		console.log(gamePlayData);

		return <div>{"Last Play"}</div>;
	}

	render() {
		return this.renderGamePlays();
	}
}

export default GamePlay;
