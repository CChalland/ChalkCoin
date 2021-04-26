import React from "react";
import { Header, Table, Rating } from "semantic-ui-react";

const GameScoreTable = () => (
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
					<Header as="h2" textAlign="center">
						<img
							className="ui avatar image"
							src={"https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/det.png"}
						/>
						{"team.name"}
						{"( "}
						{"records[0].summary"}
						{", "}
						{"records[2].summary"} {"homeAway"}
						{" )"}
					</Header>
				</Table.Cell>
				<Table.Cell singleLine>Power Output</Table.Cell>
				<Table.Cell>
					<Rating icon="star" defaultRating={3} maxRating={3} />
				</Table.Cell>
				<Table.Cell textAlign="right">
					80% <br />
					<a href="#">18 studies</a>
				</Table.Cell>
				<Table.Cell>
					Creatine supplementation is the reference compound for increasing muscular creatine levels; there is
					variability in this increase, however, with some nonresponders.
				</Table.Cell>
			</Table.Row>

			<Table.Row>
				<Table.Cell>
					<Header as="h2" textAlign="center">
						<img
							className="ui avatar image"
							src={"https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/cle.png"}
						/>
						{"team.name"}
						{"( "}
						{"records[0].summary"}
						{", "}
						{"records[2].summary"} {"homeAway"}
						{" )"}
					</Header>
				</Table.Cell>
				<Table.Cell singleLine>Weight</Table.Cell>
				<Table.Cell>
					<Rating icon="star" defaultRating={3} maxRating={3} />
				</Table.Cell>
				<Table.Cell textAlign="right">
					100% <br />
					<a href="#">65 studies</a>
				</Table.Cell>
				<Table.Cell>
					Creatine is the reference compound for power improvement, with numbers from one meta-analysis to
					assess potency
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>
);

export default GameScoreTable;
