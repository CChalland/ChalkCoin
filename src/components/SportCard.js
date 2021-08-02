import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GameScore from "./GameScore";
import GamePlay from "./GamePlay";
import GameLeader from "./GameLeader";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";
import axios from "axios";
import { SportDispatch } from "../contexts/Sports.Context";

function SportCard(props) {
	const dispatch = useContext(SportDispatch);
	const { sportData, sportName } = props;
	const [reloadData, setReloadData] = useState(props.sportData.reload);

	useEffect(() => {
		async function getData() {
			let sortedGames, leagueData;

			if (reloadData) {
				axios
					.get(
						`http://site.api.espn.com/apis/site/v2/sports/${sportData.sport}/${sportData.league_name}/scoreboard`
					)
					.then((response) => {
						leagueData = response.data;
						sortedGames = response.data.events.filter((game) => {
							setReloadData(true);
							return game.status.type.state === "in";
						});
						sortedGames.push(
							response.data.events.filter((game) => {
								if (sortedGames.length === 0) setReloadData(false);
								return game.status.type.state === "post";
							})
						);
						sortedGames.push(
							response.data.events.filter((game) => {
								return game.status.type.state === "pre";
							})
						);
						leagueData.events = sortedGames.flat();
						dispatch({ type: sportName, data: leagueData });

						console.log(sortedGames.flat());
					});
			}
		}
		setTimeout(() => {
			getData();
		}, 15000);
	});

	// console.log(sportData);

	let gameItems;
	if (sportData.data.events) {
		gameItems = sportData.data.events.map((game) => {
			console.log("game data", game);
			console.log("gameScoreCardData", GameScoreHelper(game, sportName));
			console.log("gamePlayData", GamePlayHelper(game, sportName));
			console.log("gameLeaderData", GameLeadersHelper(game, sportName));
			return (
				<Container fluid>
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
	} else {
		gameItems = <h1>Loading</h1>;
	}

	return gameItems;
}

SportCard.getInitialProps = async ({ sportData }) => {
	console.log(sportData);
};

export default SportCard;
