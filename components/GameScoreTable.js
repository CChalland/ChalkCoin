import React, { Component } from "react";
import { Table } from "react-bootstrap";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderScoreTable() {
		const { gameScoreCardData } = this.props;

		return (
			<Table basic="very">
				<thead>
					<tr>
						<th>{gameScoreCardData.shortDetail}</th>
						<th>1</th>
						{/* <th>OT</th> */}
						<th>T</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>
							<img className="ui avatar image" src={gameScoreCardData.away.logo} />
							{gameScoreCardData.away.name}
							{"( "}
							{gameScoreCardData.away.totalRecord}
							{", "}
							{gameScoreCardData.away.record}
							{" Home)"}
						</td>
						<td>{"gameScoreCardData.away.periods"}</td>
						<td>{gameScoreCardData.away.score}</td>
					</tr>

					<tr>
						<td>
							<img className="ui avatar image" src={gameScoreCardData.home.logo} />
							{gameScoreCardData.home.name}
							{"( "}
							{gameScoreCardData.home.totalRecord}
							{", "}
							{gameScoreCardData.home.record}
							{" Home)"}
						</td>
						<td>{"gameScoreCardData.home.periods"}</td>
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
