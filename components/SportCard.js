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
			game.status.type.description === "Halftime" ||
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
			detail: game.competitions[0].status.type.detail,
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

	gameLeadersHelper(game, sportName) {
		const { homeTeam, awayTeam } = this.homeAwayHelper(game);
		let athletes = [];

		let awayAthlete = awayTeam[0].leaders ? awayTeam[0].leaders.pop() : awayTeam[0].leaders;
		let homeAthlete = homeTeam[0].leaders ? homeTeam[0].leaders.pop() : homeTeam[0].leaders;
		if (awayAthlete) {
			awayAthlete = {
				title: "PLAYERS TO WATCH",
				headshot: awayAthlete.leaders[0].athlete.headshot,
				displayName: awayAthlete.leaders[0].athlete.displayName,
				teamAbr: awayTeam[0].team.abbreviation,
				position: awayAthlete.leaders[0].athlete.position.abbreviation,
				displayValue: awayAthlete.leaders[0].displayValue,
				type: awayAthlete.abbreviation,
			};
		}
		if (homeAthlete) {
			homeAthlete = {
				title: "PLAYERS TO WATCH",
				headshot: homeAthlete.leaders[0].athlete.headshot,
				displayName: homeAthlete.leaders[0].athlete.displayName,
				teamAbr: homeTeam[0].team.abbreviation,
				position: homeAthlete.leaders[0].athlete.position.abbreviation,
				displayValue: homeAthlete.leaders[0].displayValue,
				type: homeAthlete.abbreviation,
			};
		}

		if (
			(game.competitions[0].status.type.name === "STATUS_SCHEDULED" ||
				game.competitions[0].status.type.name === "STATUS_POSTPONED") &&
			sportName === "MLB"
		) {
			if (awayTeam[0].probables) {
				awayAthlete = awayTeam[0].probables.map((athlete) => {
					return {
						title: athlete.displayName,
						headshot: athlete.athlete.headshot,
						displayName: athlete.athlete.displayName,
						teamAbr: awayTeam[0].team.abbreviation,
						position: athlete.athlete.position,
						statistics: athlete.statistics,
						type: awayAthlete.abbreviation,
					};
				});
			}
			if (homeTeam[0].probables) {
				homeAthlete = homeTeam[0].probables.map((athlete) => {
					return {
						title: athlete.displayName,
						headshot: athlete.athlete.headshot,
						displayName: athlete.athlete.displayName,
						teamAbr: homeTeam[0].team.abbreviation,
						position: athlete.athlete.position,
						statistics: athlete.statistics,
						type: homeAthlete.abbreviation,
					};
				});
			}
			athletes.push(awayAthlete, homeAthlete);
		} else if (
			game.competitions[0].status.type.name === "STATUS_SCHEDULED" ||
			game.competitions[0].status.type.name === "STATUS_POSTPONED"
		) {
			athletes.push(awayAthlete, homeAthlete);
		} else if (
			game.competitions[0].status.type.description === "In Progress" ||
			game.competitions[0].status.type.description === "End of Period" ||
			game.competitions[0].status.type.description === "Halftime" ||
			game.competitions[0].status.type.description === "Rain Delay"
		) {
			if (game.competitions[0].situation.dueUp) {
				athletes = game.competitions[0].situation.dueUp.map((athlete) => {
					return {
						title: "DUE UP FOR",
						headshot: athlete.athlete.headshot,
						displayName: athlete.athlete.shortName,
						teamAbr:
							athlete.athlete.team.id === homeTeam[0].team.id
								? homeTeam[0].team.abbreviation
								: awayTeam[0].team.abbreviation,
						position: athlete.athlete.position,
						displayValue: athlete.summary,
					};
				});
			} else if (game.competitions[0].situation.pitcher && game.competitions[0].situation.batter) {
				let pitcher = {
					title: "Pitcher",
					headshot: game.competitions[0].situation.pitcher.athlete.headshot,
					displayName: game.competitions[0].situation.pitcher.athlete.shortName,
					teamAbr:
						game.competitions[0].situation.pitcher.athlete.team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					position: game.competitions[0].situation.pitcher.athlete.position,
					displayValue: game.competitions[0].situation.pitcher.summary,
				};
				let batter = {
					title: "Batter",
					headshot: game.competitions[0].situation.batter.athlete.headshot,
					displayName: game.competitions[0].situation.batter.athlete.shortName,
					teamAbr:
						game.competitions[0].situation.batter.athlete.team.id === homeTeam[0].team.id
							? homeTeam[0].team.abbreviation
							: awayTeam[0].team.abbreviation,
					position: game.competitions[0].situation.batter.athlete.position,
					displayValue: game.competitions[0].situation.batter.summary,
				};
				athletes.push(pitcher, batter);
			} else athletes.push(awayAthlete, homeAthlete);
		} else if (game.competitions[0].status.type.completed) {
			if (sportName === "NHL") {
				athletes = game.competitions[0].status.featuredAthletes.splice(2, 5).map((athlete) => {
					return {
						title: athlete.displayName,
						headshot: athlete.athlete.headshot,
						displayName: athlete.athlete.displayName,
						teamAbr:
							athlete.athlete.team.id === homeTeam[0].team.id
								? homeTeam[0].team.abbreviation
								: awayTeam[0].team.abbreviation,
						position: athlete.athlete.position,
						statistics: athlete.statistics,
						type: athlete.abbreviation,
					};
				});
			} else if (sportName === "MLB") {
				athletes = game.competitions[0].status.featuredAthletes.map((athlete) => {
					return {
						title: athlete.displayName,
						headshot: athlete.athlete.headshot,
						displayName: athlete.athlete.displayName,
						teamAbr:
							athlete.athlete.team.id === homeTeam[0].team.id
								? homeTeam[0].team.abbreviation
								: awayTeam[0].team.abbreviation,
						position: athlete.athlete.position,
						statistics: athlete.statistics,
						type: homeAthlete.abbreviation,
					};
				});
			} else {
				athletes.push(awayAthlete, homeAthlete);
			}
		}

		return {
			sportName: sportName,
			athletes: athletes.flat(),
		};
	}

	renderGamesCards(sportId) {
		const { sportData, sportName } = this.props;

		let gameItems = sportData.data.events.map((game) => {
			console.log(game);
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
							<GameLeader gameLeadersData={this.gameLeadersHelper(game, sportName)} sportName={sportName} />
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
