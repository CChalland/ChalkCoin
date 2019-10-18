import React, { Component } from "react";
import { Card, Button, Tab, Accordion, Icon } from "semantic-ui-react";
import { Link } from "../routes";
import BetDoughnutChart from "./BetDoughnutChart";

class SportCard extends Component {
	constructor(props) {
		super(props);
		this.state = { index: 0, daysIndex: 0, timeTitle: "", activeIndex: 0 };

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	renderGamesCards(sportId) {
		const { activeIndex } = this.state;

		let gameItems = this.props.sportData[sportId].data.events.map(game => {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			let gameTime = new Date(game.event_date).toLocaleString("en-US", {
				timeZone: timeZone
			});
			let eventDate = gameTime.split(",");

			let bettingIndexes = Object.keys(game.line_periods);
			let firstBettingIndex = bettingIndexes[0];

			let defSpreadHelper = game.line_periods[firstBettingIndex].period_full_game.spread;
			let spread;
			let spreadTeam = (spread = game.teams_normalized[0].is_away
				? game.teams_normalized[0].abbreviation
				: game.teams_normalized[1].abbreviation);

			if (defSpreadHelper.point_spread_away < defSpreadHelper.point_spread_home) {
				spread = spreadTeam + " " + defSpreadHelper.point_spread_away;
			} else {
				spread = spreadTeam + " " + defSpreadHelper.point_spread_home;
			}

			let fullClock = eventDate[1].split(":00 ");
			let displayDate = `${fullClock[0]} ${fullClock[1]}`;

			let team0Name;
			let team1Name;
			if (this.props.sportName === "MLS") {
				team0Name = `${game.teams_normalized[0].name} ${game.teams_normalized[0].mascot}`;
				team1Name = `${game.teams_normalized[1].name} ${game.teams_normalized[1].mascot}`;
			} else {
				team0Name = game.teams_normalized[0].mascot;
				team1Name = game.teams_normalized[1].mascot;
			}

			return {
				date: eventDate[0],
				description: (
					<div>
						<h4>
							<img
								className="ui avatar image"
								src={`../static/media/${game.sport_id}-${game.teams_normalized[0].abbreviation}.png`}
							/>
							{team0Name}
							<span style={{ position: "absolute", right: "400px" }}>{game.teams_normalized[0].record}</span>
							<br />
							<span
								style={{
									width: "1px",
									background: "rgba(34,36,38,.15)",
									position: "absolute",
									top: "0",
									bottom: "0",
									right: "350px"
								}}
							/>
							<span style={{ position: "absolute", right: "200px" }}>
								{displayDate}
								<br />
								{this.props.sportName}
								<br />
								{spread}
							</span>
							<Link
								href={{
									pathname: "/bets/new",
									query: { sportId: game.sport_id, eventId: game.event_id }
								}}
							>
								<a>
									<Button floated="right" content="Create Bet" icon="add circle" primary />
								</a>
							</Link>
							<br />
							<img
								className="ui avatar image"
								src={`../static/media/${game.sport_id}-${game.teams_normalized[1].abbreviation}.png`}
							/>
							{team1Name}
							<span style={{ position: "absolute", right: "400px" }}>{game.teams_normalized[1].record}</span>
						</h4>
						<Accordion>
							<Accordion.Title
								active={activeIndex === game.event_id}
								index={game.event_id}
								onClick={this.handleClick}
							>
								<Icon name="dropdown" />
								Matchup Predictor
							</Accordion.Title>
							<Accordion.Content active={activeIndex === game.event_id}>
								<BetDoughnutChart eventsData={game} />
							</Accordion.Content>
						</Accordion>
					</div>
				),
				fluid: true
			};
		});

		let datesArray = gameItems.map(obj => {
			return obj.date;
		});

		let dates = datesArray
			.filter((item, index) => datesArray.indexOf(item) === index)
			.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);

		let eventsResult = dates.map(date => {
			return gameItems.filter(obj => {
				return obj.date === date;
			});
		});

		let paneResult = eventsResult.map(obj => {
			let tempDate = new Date(obj[0].date);
			let tempsDate = tempDate.toString().slice(0, 10);

			return {
				menuItem: obj[0].date,
				render: () => (
					<Tab.Pane attached={false} style={{ overflow: "auto", maxHeight: "75em" }}>
						<h2>{tempsDate}</h2>
						<Card.Group items={obj} />
					</Tab.Pane>
				)
			};
		});

		return <Tab menu={{ attached: false }} panes={paneResult} />;
	}

	render() {
		return <div>{this.renderGamesCards(this.props.sportIndex)}</div>;
	}
}

export default SportCard;
