import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "../routes";
import GameScore from "./GameScore";
import GamePlay from "./GamePlay";
import GameLeader from "./GameLeader";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";

class SportCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			activeIndex: 0,
			gameScoreCard: {},
		};
	}

	renderGamesCards(sportId) {
		const { sportData, sportName } = this.props;

		let gameItems = sportData.data.events.map((game) => {
			// console.log(game);
			return (
				<Container>
					<Row className="mt-3 mb-3">
						<Col sm={4} className="border rounded">
							<GameScore
								key={game.uid.toString()}
								gameScoreCardData={GameScoreHelper(game, sportName)}
								sportName={sportName}
							/>
						</Col>

						<Col sm={3} className="border rounded">
							<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
						</Col>

						<Col sm={3} className="border rounded">
							<GameLeader gameLeadersData={GameLeadersHelper(game, sportName)} sportName={sportName} />
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
