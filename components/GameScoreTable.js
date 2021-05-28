import React, { Component } from "react";
import { Table, Container, Row, Col, Image } from "react-bootstrap";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	pregameHelper() {
		const { gameScoreCardData } = this.props;

		return (
			<Container>
				<Row>{gameScoreCardData.shortDetail}</Row>
				<Row>
					<Col>
						<Image width={50} height={50} src={gameScoreCardData.away.logo} />
					</Col>
					<Col>
						<Row>{gameScoreCardData.away.name}</Row>
						<Row className="text-secondary">
							{"(" +
								gameScoreCardData.away.records[0].summary +
								", " +
								gameScoreCardData.away.records[1].summary +
								" Away)"}
						</Row>
					</Col>
				</Row>
				<Row>
					<Row>
						<Col>
							<Image width={50} height={50} src={gameScoreCardData.home.logo} />
						</Col>
						<Col>
							<Row>{gameScoreCardData.home.name}</Row>
							<Row className="text-secondary">
								{"(" +
									gameScoreCardData.home.records[0].summary +
									", " +
									gameScoreCardData.home.records[1].summary +
									" Home)"}
							</Row>
						</Col>
					</Row>
				</Row>
			</Container>
		);
	}

	scoreTableRecordHelper() {
		const { gameScoreCardData } = this.props;
	}

	renderScoreTable() {
		const { gameScoreCardData } = this.props;
		let scoreTableState;

		scoreTableState = this.pregameHelper();
		// console.log(linscoresBody);
		// console.log(gameScoreCardData);
		// console.log(gameScoreCardData.away.records);

		return scoreTableState;

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
