import React, { Component } from "react";
import { Table, Container, Row } from "react-bootstrap";

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
			<Table>
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
							<Container>
								<img className="ui avatar image" src={gameScoreCardData.away.logo} />
								<Row>{gameScoreCardData.away.name}</Row>
								<Row>
									{"( "}
									{gameScoreCardData.away.records[0].summary}
									{", "}
									{gameScoreCardData.away.records[2].summary}
									{" Away)"}
								</Row>
							</Container>
						</td>
						{awayLinscoresBody}
						<td>{gameScoreCardData.away.score}</td>
					</tr>

					<tr>
						<td>
							<Container>
								<img className="ui avatar image" src={gameScoreCardData.home.logo} />
								<Row>{gameScoreCardData.home.name}</Row>
								<Row>
									{"( "}
									{gameScoreCardData.home.records[0].summary}
									{", "}
									{gameScoreCardData.home.records[1].summary}
									{" Home)"}
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
