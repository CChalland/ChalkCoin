import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class GamePlay extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	basesHelper(bases) {}

	renderGamePlays() {
		const { gamePlayData } = this.props;
		let venue, weather, tickets, odds, lastPlay, headline;

		console.log(gamePlayData);

		if (gamePlayData.status.type.name === "STATUS_SCHEDULED") {
			if (gamePlayData.weather) {
				weather = <Col>{`${gamePlayData.weather.temperature} °F`}</Col>;
			}

			if (gamePlayData.tickets) {
				tickets = <Row>{gamePlayData.tickets.summary}</Row>;
			}

			venue = (
				<Col>
					<Row>{gamePlayData.venue.fullName}</Row>
					<Row>{`${gamePlayData.venue.address.city}, ${gamePlayData.venue.address.state}`}</Row>
				</Col>
			);

			odds = (
				<div>
					<Row>{`Line: ${gamePlayData.odds.details}`}</Row>
					<Row>{`O/U: ${gamePlayData.odds.overUnder}`}</Row>
				</div>
			);
		} else if (gamePlayData.status.type.state === "in") {
		} else if (gamePlayData.status.type.completed) {
			if (gamePlayData.headlines) {
				headline = (
					<Row>
						<div>{gamePlayData.headlines.shortLinkText}</div>
						<div>{gamePlayData.headlines.description}</div>
					</Row>
				);
			}
		}
		return (
			<Container>
				<Row>
					{venue}
					{weather}
				</Row>
				{headline}
				{tickets}
				{odds}
			</Container>
		);
	}

	render() {
		return this.renderGamePlays();
	}
}

export default GamePlay;
