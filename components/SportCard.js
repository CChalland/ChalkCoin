import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "../routes";
import GameScore from "./GameScore";
import GamePlay from "./GamePlay";
import GameLeader from "./GameLeader";

class SportCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			activeIndex: 0,
			gameScoreCard: {},
		};
	}

	homeAwayHelper(game) {
		let homeTeam = game.competitions[0].competitors.filter((team) => {
			return team.homeAway === "home";
		});
		let awayTeam = game.competitions[0].competitors.filter((team) => {
			return team.homeAway === "away";
		});
		return { homeTeam, awayTeam };
	}

	gameScoreHelper(game) {
		const { sportName } = this.props;
		const { homeTeam, awayTeam } = this.homeAwayHelper(game);
		let homePeriods, awayPeriods, homeRecords, awayRecords;
		let temp = [
			{ name: "Home", type: "home", summary: 0 },
			{ name: "Away", type: "away", summary: 0 },
		];

		if (sportName === "MLB") {
			awayPeriods = awayTeam[0].statistics;
			homePeriods = homeTeam[0].statistics;
		} else if (
			game.status.type.description === "In Progress" ||
			game.status.type.description === "End of Period" ||
			game.status.type.completed
		) {
			awayPeriods = awayTeam[0].linescores;
			homePeriods = homeTeam[0].linescores;
		} else {
			awayPeriods = [];
			homePeriods = [];
		}

		if (!game.competitions[0].competitors[0].records) {
			homeRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
			awayRecords = [{ name: "Total", type: "total", summary: 0 }, ...temp];
		} else if (game.competitions[0].competitors[0].records.length > 1) {
			homeRecords = homeTeam[0].records;
			awayRecords = awayTeam[0].records;
		} else {
			homeRecords = [...homeTeam[0].records, ...temp];
			awayRecords = [...awayTeam[0].records, ...temp];
		}

		return {
			status: game.status,
			shortDetail: game.competitions[0].status.type.shortDetail,
			away: {
				logo: awayTeam[0].team.logo,
				name: awayTeam[0].team.name,
				records: awayRecords,
				score: awayTeam[0].score,
				periods: awayPeriods,
			},
			home: {
				logo: homeTeam[0].team.logo,
				name: homeTeam[0].team.name,
				records: homeRecords,
				score: homeTeam[0].score,
				periods: homePeriods,
			},
		};
	}

	gamePlayHelper(game) {
		const { sportName } = this.props;

		return game;
	}

	gameLeadersHelper(game) {
		const { sportName } = this.props;
		const { homeTeam, awayTeam } = this.homeAwayHelper(game);
		let homeLeaders, awayLeaders;

		homeLeaders = homeTeam[0].leaders;
		awayLeaders = awayTeam[0].leaders;

		return {
			sportName: sportName,
			status: game.status,
			away: awayLeaders,
			home: homeLeaders,
		};
	}

	renderGamesCards(sportId) {
		const { sportData, sportName } = this.props;

		let gameItems = sportData.data.events.map((game) => {
			return (
				<Container>
					<Row>
						<Col>
							<GameScore
								key={game.uid.toString()}
								gameScoreCardData={this.gameScoreHelper(game)}
								sportName={sportName}
							/>
						</Col>

						<Col>
							<GamePlay gamePlayData={this.gamePlayHelper(game)} />
						</Col>

						<Col>
							<GameLeader gameLeadersData={this.gameLeadersHelper(game)} />
						</Col>
					</Row>
				</Container>
			);
		});

		return gameItems;
	}

	render() {
		return this.renderGamesCards(this.props.sportIndex);
	}
}

export default SportCard;
