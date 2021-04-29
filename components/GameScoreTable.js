import React, { Component } from "react";
import { Header, Table, Rating } from "semantic-ui-react";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderScoreTable() {
		const { gameScoreCardData } = this.props;

		return (
			<Table celled padded>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell singleLine>shortDetail</Table.HeaderCell>
						<Table.HeaderCell>linescore1</Table.HeaderCell>
						<Table.HeaderCell>linescore2</Table.HeaderCell>
						<Table.HeaderCell>linescore3</Table.HeaderCell>
						<Table.HeaderCell>linescore4</Table.HeaderCell>
						<Table.HeaderCell>OT</Table.HeaderCell>
						<Table.HeaderCell>T</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<img className="ui avatar image" src={gameScoreCardData.away.logo} />
							{gameScoreCardData.away.name}
							{"( "}
							{gameScoreCardData.away.totalRecord}
							{", "}
							{gameScoreCardData.away.awayRecord}
							{" Away)"}
						</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.away.linescore1}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.away.linescore2}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.away.linescore3}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.away.linescore4}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.away.score}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell>
							<img className="ui avatar image" src={gameScoreCardData.home.logo} />
							{gameScoreCardData.home.name}
							{"( "}
							{gameScoreCardData.home.totalRecord}
							{", "}
							{gameScoreCardData.home.homeRecord}
							{" Home)"}
						</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.home.linescore1}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.home.linescore2}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.home.linescore3}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.home.linescore4}</Table.Cell>
						<Table.Cell singleLine>{gameScoreCardData.home.score}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		);
	}

	render() {
		return <div>{this.renderScoreTable()}</div>;
	}
}

export default GameScoreTable;
