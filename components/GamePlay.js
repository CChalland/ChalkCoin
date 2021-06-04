import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class GamePlay extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderGamePlays() {
		return <div>{"Last Play"}</div>;
	}

	render() {
		return this.renderGamePlays();
	}
}

export default GamePlay;
