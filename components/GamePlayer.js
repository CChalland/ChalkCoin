import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class GamePlayer extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	renderGamePlayers() {
		const { gamePlayerData } = this.props;

		console.log(gamePlayerData);

		return <div>{"TOP PERFORMERS"}</div>;
	}

	render() {
		return this.renderGamePlayers();
	}
}

export default GamePlayer;
