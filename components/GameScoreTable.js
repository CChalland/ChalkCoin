import React, { Component } from "react";
import { Table, Container, Row, Col, Image } from "react-bootstrap";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	scoreTableRecordHelper() {
		const { gameScoreCardData } = this.props;
	}

	renderScoreTable() {
		const { gameScoreCardData } = this.props;
		let index = 0;

		let linescoresHeader = gameScoreCardData.away.periods.map((game) => {
			index++;
			return <th>{index}</th>;
		});

		let homeLinscoresBody = gameScoreCardData.home.periods.map((period) => {
			return <td>{period.value}</td>;
		});
		let awayLinscoresBody = gameScoreCardData.away.periods.map((period) => {
			return <td>{period.value}</td>;
		});

		// console.log(linscoresBody);
		// console.log(gameScoreCardData);
		// console.log(gameScoreCardData.away.records);

		return (
			<Table borderless>
				<thead>
					<tr>
						<th>{gameScoreCardData.shortDetail}</th>
						{linescoresHeader}
						<th>T</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>
							<Container fluid>
								<Row>
									<Col>
										<Image width={50} height={50} src={gameScoreCardData.away.logo} />
									</Col>
									<Col>
										<Row>{gameScoreCardData.away.name}</Row>
										<Row>
											{"( " +
												gameScoreCardData.away.records[0].summary +
												", " +
												gameScoreCardData.away.records[1].summary +
												" Home)"}
										</Row>
									</Col>
								</Row>
							</Container>
						</td>
						{awayLinscoresBody}
						<td>{gameScoreCardData.away.score}</td>
					</tr>

					<tr>
						<td>
							<Container fluid>
								<Row>
									<Col>
										<Image width={50} height={50} src={gameScoreCardData.home.logo} />
									</Col>
									<Col>
										<Row>{gameScoreCardData.home.name}</Row>
										<Row>
											{"( " +
												gameScoreCardData.home.records[0].summary +
												", " +
												gameScoreCardData.home.records[1].summary +
												" Home)"}
										</Row>
									</Col>
								</Row>
							</Container>
						</td>
						{homeLinscoresBody}
						<td>{gameScoreCardData.home.score}</td>
					</tr>
				</tbody>
			</Table>
		);
	}

	render() {
		return <div>{this.renderScoreTable()}</div>;
	}
}

export default GameScoreTable;
