import React, { Component } from "react";
import { Table, Container, Row, Col, Image } from "react-bootstrap";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	tableTitleHelper(gameScoreCardData) {
		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED"
		) {
			return (
				<Row className="h6">
					<Col>{gameScoreCardData.shortDetail}</Col>
				</Row>
			);
		} else {
			return (
				<Row className="h6">
					<Col>{gameScoreCardData.shortDetail}</Col>
					<Col>{"T"}</Col>
				</Row>
			);
		}
	}

	awayScoreBoardHelper(gameScoreCardData) {
		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED"
		) {
			return null;
		} else {
			return <Col>{gameScoreCardData.away.score}</Col>;
		}
	}

	homeScoreBoardHelper(gameScoreCardData) {
		if (
			gameScoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			gameScoreCardData.status.type.name === "STATUS_POSTPONED"
		) {
			return null;
		} else {
			return <Col>{gameScoreCardData.home.score}</Col>;
		}
	}

	scoreTableHelper() {
		const { gameScoreCardData } = this.props;
	}

	renderScoreTable() {
		const { gameScoreCardData } = this.props;
		// let index = 0;
		// let linescoresHeader = gameScoreCardData.away.periods.map((game) => {
		// 	index++;
		// 	return <th>{index}</th>;
		// });
		// let homeLinscoresBody = gameScoreCardData.home.periods.map((period) => {
		// 	return <td>{period.value}</td>;
		// });
		// let awayLinscoresBody = gameScoreCardData.away.periods.map((period) => {
		// 	return <td>{period.value}</td>;
		// });
		console.log(gameScoreCardData);

		return (
			<Container>
				{this.tableTitleHelper(gameScoreCardData)}
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
					{this.awayScoreBoardHelper(gameScoreCardData)}
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
						{this.homeScoreBoardHelper(gameScoreCardData)}
					</Row>
				</Row>
			</Container>
		);

		// return (
		// 	<Table borderless>
		// 		<thead>
		// 			<tr>
		// 				<th>{gameScoreCardData.shortDetail}</th>
		// 				{linescoresHeader}
		// 				<th>T</th>
		// 			</tr>
		// 		</thead>

		// 		<tbody>
		// 			<tr>
		// 				<td>
		// 					<Container fluid>
		// 						<Row>
		// 							<Col>
		// 								<Image width={50} height={50} src={gameScoreCardData.away.logo} />
		// 							</Col>
		// 							<Col>
		// 								<Row>{gameScoreCardData.away.name}</Row>
		// 								<Row className="text-secondary">
		// 									{"(" +
		// 										gameScoreCardData.away.records[0].summary +
		// 										", " +
		// 										gameScoreCardData.away.records[1].summary +
		// 										" Away)"}
		// 								</Row>
		// 							</Col>
		// 						</Row>
		// 					</Container>
		// 				</td>
		// 				{awayLinscoresBody}
		// 				<td>{gameScoreCardData.away.score}</td>
		// 			</tr>

		// 			<tr>
		// 				<td>
		// 					<Container fluid>
		// 						<Row>
		// 							<Col>
		// 								<Image width={50} height={50} src={gameScoreCardData.home.logo} />
		// 							</Col>
		// 							<Col>
		// 								<Row>{gameScoreCardData.home.name}</Row>
		// 								<Row className="text-secondary">
		// 									{"(" +
		// 										gameScoreCardData.home.records[0].summary +
		// 										", " +
		// 										gameScoreCardData.home.records[1].summary +
		// 										" Home)"}
		// 								</Row>
		// 							</Col>
		// 						</Row>
		// 					</Container>
		// 				</td>
		// 				{homeLinscoresBody}
		// 				<td>{gameScoreCardData.home.score}</td>
		// 			</tr>
		// 		</tbody>
		// 	</Table>
		// );
	}

	render() {
		return <div>{this.renderScoreTable()}</div>;
	}
}

export default GameScoreTable;
