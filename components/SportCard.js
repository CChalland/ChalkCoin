import React, { Component } from "react";
import { Card, Button, Tab, Accordion, Icon } from "semantic-ui-react";
import { Link } from "../routes";

class SportCard extends Component {
	constructor(props) {
		super(props);
		this.state = { index: 0, activeIndex: 0 };

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

		console.log(this.props.sportData[sportId].data.events);

		let gameItems = this.props.sportData[sportId].data.events.map((game) => {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			let gameTime = new Date(game.date).toLocaleString("en-US", {
				timeZone: timeZone,
			});
			let eventDate = gameTime.split(",");

			return {
				date: eventDate[0],
				description: (
					<div>
						<h4>
							<img className="ui avatar image" src={game.competitions[0].competitors[0].team.logo} />
							{game.competitions[0].competitors[0].team.displayName}
							<span style={{ position: "absolute", right: "400px" }}>
								{game.competitions[0].competitors[0].records[0].summary}
							</span>
							<br />
							<span
								style={{
									width: "1px",
									background: "rgba(34,36,38,.15)",
									position: "absolute",
									top: "0",
									bottom: "0",
									right: "350px",
								}}
							/>

							<Link
								href={{
									pathname: "/bets/new",
									query: { sportId: game.sport_id, eventId: game.event_id },
								}}
							>
								<a>
									<Button floated="right" content="Create Bet" icon="add circle" primary />
								</a>
							</Link>
							<br />
							<img className="ui avatar image" src={game.competitions[0].competitors[1].team.logo} />
							{game.competitions[0].competitors[1].team.displayName}
							<span style={{ position: "absolute", right: "400px" }}>
								{game.competitions[0].competitors[1].records[0].summary}
							</span>
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
