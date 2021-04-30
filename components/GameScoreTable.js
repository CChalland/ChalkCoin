import React, { Component } from "react";
import { Table, Grid } from "semantic-ui-react";

class GameScoreTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderScoreTable() {
		const { gameScoreCardData } = this.props;

		return (
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell singleLine>{gameScoreCardData.shortDetail}</Table.HeaderCell>
						<Table.HeaderCell>1</Table.HeaderCell>
						<Table.HeaderCell>2</Table.HeaderCell>
						<Table.HeaderCell>3</Table.HeaderCell>
						<Table.HeaderCell>4</Table.HeaderCell>
						{/* <Table.HeaderCell>OT</Table.HeaderCell> */}
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
							{gameScoreCardData.away.record}
							{" Home)"}
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
							{gameScoreCardData.home.record}
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
