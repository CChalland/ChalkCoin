import React, { Component } from "react";
import { Card, Button, Tab, Accordion, Icon, Grid } from "semantic-ui-react";
import { Link } from "../routes";
import GameScoreTable from "./GameScoreTable";

class SportCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			activeIndex: 0,
			gameScoreCard: {},
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	gameScoreCardHelper(game) {
		let gameData = {
			shortDetail: game.competitions[0].status.type.shortDetail,
			away: {
				teamLogo: game.competitions[0].competitors[0].team.logo,
				teamName: game.competitions[0].competitors[0].team.name,
				teamTotalRecord: game.competitions[0].competitors[0].records[0].summary,
				teamAwayRecord: game.competitions[0].competitors[0].records[2].summary,
				team1Linescore: game.competitions[0].competitors[0].linescores[0].value,
				team2Linescore: game.competitions[0].competitors[0].linescores[1].value,
				team3Linescore: game.competitions[0].competitors[0].linescores[2].value,
				team4Linescore: game.competitions[0].competitors[0].linescores[3].value,
				score: game.competitions[0].competitors[0].score,
			},
			home: {
				teamLogo: game.competitions[0].competitors[1].team.logo,
				teamName: game.competitions[0].competitors[1].team.name,
				teamTotalRecord: game.competitions[0].competitors[1].records[0].summary,
				teamHomeRecord: game.competitions[0].competitors[1].records[2].summary,
				team1Linescore: game.competitions[0].competitors[1].linescores[0].value,
				team2Linescore: game.competitions[0].competitors[1].linescores[1].value,
				team3Linescore: game.competitions[0].competitors[1].linescores[2].value,
				team4Linescore: game.competitions[0].competitors[1].linescores[3].value,
				score: game.competitions[0].competitors[1].score,
			},
		};
		return gameData;
	}

	renderGamesCards(sportId) {
		const { activeIndex } = this.state;

		let gameItems = this.props.sportData[sportId].data.events.map((game) => {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			let gameTime = new Date(game.date).toLocaleString("en-US", {
				timeZone: timeZone,
			});
			let eventDate = gameTime.split(",");

			console.log(this.gameScoreCardHelper(game));

			return {
				date: eventDate[0],
				description: (
					<div>
						<Grid celled="internally">
							<Grid.Column width={9}>
								{/* <Grid.Row>
									<div>
										{game.competitions[0].status.type.shortDetail}
										{"1 "}
										{"2 "}
										{"3 "}
										{"4 "}
										{"OT "}
										{"T"}
									</div>
								</Grid.Row>
								<Grid.Row>
									<img className="ui avatar image" src={game.competitions[0].competitors[0].team.logo} />
									{game.competitions[0].competitors[0].team.name}
									{"( "}
									{game.competitions[0].competitors[0].records[0].summary}
									{", "}
									{game.competitions[0].competitors[0].records[2].summary}{" "}
									{game.competitions[0].competitors[0].homeAway}
									{" )"}
									{game.competitions[0].competitors[0].linescores[0].value}
									{game.competitions[0].competitors[0].linescores[1].value}
									{game.competitions[0].competitors[0].linescores[2].value}
									{game.competitions[0].competitors[0].linescores[3].value}
									{game.competitions[0].competitors[0].score}
								</Grid.Row>
								<Grid.Row>
									<img className="ui avatar image" src={game.competitions[0].competitors[1].team.logo} />
									{game.competitions[0].competitors[1].team.name}
									{"( "}
									{game.competitions[0].competitors[1].records[0].summary}
									{", "}
									{game.competitions[0].competitors[1].records[2].summary}{" "}
									{game.competitions[0].competitors[1].homeAway}
									{" )"}
									{game.competitions[0].competitors[1].linescores[0].value}
									{game.competitions[0].competitors[1].linescores[1].value}
									{game.competitions[0].competitors[1].linescores[2].value}
									{game.competitions[0].competitors[1].linescores[3].value}
									{game.competitions[0].competitors[1].score}
								</Grid.Row> */}

								<GameScoreTable gameScoreCardData={this.gameScoreCardHelper(game)} />
							</Grid.Column>

							<Grid.Column width={2}>
								<div>{"Last Play"}</div>
							</Grid.Column>

							<Grid.Column width={5}>
								<Grid.Row>
									<div>{"TOP PERFORMERS"}</div>
								</Grid.Row>
								<Grid.Row>
									<img className="ui avatar image" src={""} />
								</Grid.Row>
							</Grid.Column>
						</Grid>

						<Accordion>
							<Accordion.Title
								active={activeIndex === game.event_id}
								index={game.event_id}
								onClick={this.handleClick}
							>
								<Icon name="dropdown" />
								Matchup Predictor
							</Accordion.Title>
							<Accordion.Content active={activeIndex === game.event_id}></Accordion.Content>
						</Accordion>
					</div>
				),
				fluid: true,
			};
		});

		let datesArray = gameItems.map((obj) => {
			return obj.date;
		});

		let dates = datesArray
			.filter((item, index) => datesArray.indexOf(item) === index)
			.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);

		let eventsResult = dates.map((date) => {
			return gameItems.filter((obj) => {
				return obj.date === date;
			});
		});

		let paneResult = eventsResult.map((obj) => {
			let tempDate = new Date(obj[0].date);
			let tempsDate = tempDate.toString().slice(0, 10);

			return {
				menuItem: obj[0].date,
				render: () => (
					<Tab.Pane attached={false} style={{ overflow: "auto", maxHeight: "75em" }}>
						<h2>{tempsDate}</h2>
						<Card.Group items={obj} />
					</Tab.Pane>
				),
			};
		});

		return <Tab menu={{ attached: false }} panes={paneResult} />;
	}

	render() {
		return <div>{this.renderGamesCards(this.props.sportIndex)}</div>;
	}
}

export default SportCard;
