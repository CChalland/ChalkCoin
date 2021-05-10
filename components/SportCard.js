import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
		let homePeriods, awayPeriods, homeRecords, awayRecords;
		let temp = [
			{ name: "Home", type: "home", summary: 0 },
			{ name: "Away", type: "away", summary: 0 },
		];

		if (game.status.type.description === "In Progress" || game.status.type.completed) {
			awayPeriods = game.competitions[0].competitors[0].linescores;
			homePeriods = game.competitions[0].competitors[1].linescores;
		} else {
			awayPeriods = [];
			homePeriods = [];
		}

		if (game.competitions[0].competitors[0].records.length > 1) {
			homeRecords = game.competitions[0].competitors[1].records;
			awayRecords = game.competitions[0].competitors[0].records;
		} else {
			homeRecords = [...game.competitions[0].competitors[1].records, ...temp];
			awayRecords = [...game.competitions[0].competitors[0].records, ...temp];
		}

		let gameData = {
			shortDetail: game.competitions[0].status.type.shortDetail,
			away: {
				logo: game.competitions[0].competitors[0].team.logo,
				name: game.competitions[0].competitors[0].team.name,
				records: awayRecords,
				score: game.competitions[0].competitors[0].score,
				periods: awayPeriods,
			},
			home: {
				logo: game.competitions[0].competitors[1].team.logo,
				name: game.competitions[0].competitors[1].team.name,
				records: homeRecords,
				score: game.competitions[0].competitors[1].score,
				periods: homePeriods,
			},
		};
		return gameData;
	}

	renderGamesCards(sportId) {
		const { activeIndex } = this.state;

		let gameItems = this.props.sportData.data.events.map((game) => {
			// const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			// let gameTime = new Date(game.date).toLocaleString("en-US", {
			// 	timeZone: timeZone,
			// });
			// let eventDate = gameTime.split(",");

			// console.log(this.gameScoreCardHelper(game));
			// console.log(game);

			return (
				<div>
					<Container>
						<Col width={9}>
							<GameScoreTable gameScoreCardData={this.gameScoreCardHelper(game)} />
						</Col>

						<Col width={2}>
							<div>{"Last Play"}</div>
						</Col>

						<Col width={5}>
							<Row>
								<div>{"TOP PERFORMERS"}</div>
							</Row>
							<Row>
								<img className="ui avatar image" src={""} />
							</Row>
						</Col>
					</Container>
				</div>
			);
		});

		// let datesArray = gameItems.map((obj) => {
		// 	return obj.date;
		// });

		// let dates = datesArray
		// 	.filter((item, index) => datesArray.indexOf(item) === index)
		// 	.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);

		// let eventsResult = dates.map((date) => {
		// 	return gameItems.filter((obj) => {
		// 		return obj.date === date;
		// 	});
		// });

		// let paneResult = eventsResult.map((obj) => {
		// 	let tempDate = new Date(obj[0].date);
		// 	let tempsDate = tempDate.toString().slice(0, 10);

		// 	return {
		// 		menuItem: obj[0].date,
		// 		render: () => (
		// 			<Tab.Pane attached={false} style={{ overflow: "auto", maxHeight: "75em" }}>
		// 				<h2>{tempsDate}</h2>
		// 				<Card.Group items={obj} />
		// 			</Tab.Pane>
		// 		),
		// 	};
		// });

		return gameItems;
	}

	render() {
		return <div>{this.renderGamesCards(this.props.sportIndex)}</div>;
	}
}

export default SportCard;
