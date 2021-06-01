import React, { Component } from "react";
import { Table, Container, Row, Col, Image } from "react-bootstrap";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	scoreTableHelper(gameScoreCardData, sportName) {
		let title, awayBoard, homeBoard;
		let index = 0;
		let linescoresHeader = gameScoreCardData.away.periods.map((period) => {
			index++;
			return <Col>{index}</Col>;
		});

		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED"
		) {
			title = (
				<Row className="h6">
					<Col>{gameScoreCardData.shortDetail}</Col>
				</Row>
			);
		} else {
			title = (
				<Row className="h6">
					<Col>{gameScoreCardData.shortDetail}</Col>
					{linescoresHeader}
					<Col>{"T"}</Col>
				</Row>
			);
			awayBoard = gameScoreCardData.away.periods.map((period) => {
				return <Col>{period.value}</Col>;
			});
			homeBoard = gameScoreCardData.home.periods.map((period) => {
				return <Col>{period.value}</Col>;
			});
		}

		return { title, awayBoard, homeBoard };
	}

	renderScoreTable() {
		const { gameScoreCardData, sportName } = this.props;
		const { title, awayBoard, homeBoard } = this.scoreTableHelper(gameScoreCardData, sportName);

		console.log(gameScoreCardData);

		return (
			<Container>
				{title}
				<Row>
					<Col md="auto" lg="auto" xl="auto">
						<Image width={40} height={40} src={gameScoreCardData.away.logo} rounded />
					</Col>
					<Col md="auto" lg="auto" xl="auto">
						<Row className="h5">{gameScoreCardData.away.name}</Row>
						<Row className="h6 text-secondary">
							{"(" +
								gameScoreCardData.away.records[0].summary +
								", " +
								gameScoreCardData.away.records[1].summary +
								" Away)"}
						</Row>
					</Col>
					{awayBoard}
					<Col>{gameScoreCardData.away.score}</Col>
				</Row>
				<Row>
					<Row>
						<Col md="auto" lg="auto" xl="auto">
							<Image width={40} height={40} src={gameScoreCardData.home.logo} rounded />
						</Col>
						<Col md="auto" lg="auto" xl="auto">
							<Row className="h5">{gameScoreCardData.home.name}</Row>
							<Row className="h6 text-secondary">
								{"(" +
									gameScoreCardData.home.records[0].summary +
									", " +
									gameScoreCardData.home.records[1].summary +
									" Home)"}
							</Row>
						</Col>
						{homeBoard}
						<Col>{gameScoreCardData.home.score}</Col>
					</Row>
				</Row>
			</Container>
		);
	}

	render() {
		return <div>{this.renderScoreTable()}</div>;
	}
}

export default GameScoreTable;
