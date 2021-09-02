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
	let reloadData = props.sportData.reload;

	useEffect(() => {
		async function getData() {
			let preGames,
				inGames,
				postGames,
				leagueData,
				sortedGames = [];

			if (reloadData) {
				axios
					.get(
						`http://site.api.espn.com/apis/site/v2/sports/${sportData.sport}/${sportData.league_name}/scoreboard`
					)
					.then((response) => {
						leagueData = response.data;
						inGames = response.data.events.filter((game) => {
							reloadData = true;
							return game.status.type.state === "in";
						});
						postGames = response.data.events.filter((game) => {
							return game.status.type.state === "post";
						});
						preGames = response.data.events.filter((game) => {
							return game.status.type.state === "pre";
						});

						if (inGames.length === 0) reloadData = false;
						sortedGames.push(inGames, postGames, preGames);
						leagueData.events = sortedGames.flat();
						dispatch({ type: sportName, data: leagueData, reload: reloadData });

						console.log(sortedGames.flat());
					});
			}
		}
		setTimeout(() => {
			getData();
		}, 15000);
	});

	let gameItems;
	if (sportData.data.events) {
		gameItems = sportData.data.events.map((game, key) => {
			console.log("game data", game);
			console.log("gameScoreCardData", GameScoreHelper(game, sportName));
			console.log("gamePlayData", GamePlayHelper(game, sportName));
			console.log("gameLeaderData", GameLeadersHelper(game, sportName));

			return (
				<Container key={key} fluid>
					{/* For lage screen */}
					<Col className="mx-0 px-0 d-none d-lg-block">
						<Row className="mt-3 mb-3 ">
							<Col lg={5} xxl={4} className="border rounded">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col lg={3} xxl={2} className="border rounded">
								<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
							</Col>

							<Col lg={3} xxl={2} className="border rounded">
								<GameLeader gameLeadersData={GameLeadersHelper(game, sportName)} sportName={sportName} />
							</Col>
							<Col lg={1}>
								<p>BET Button</p>
							</Col>
						</Row>
					</Col>

					{/* For medium screen */}
					<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
						<Row className="mt-3 mb-3 ">
							<Col md={6} className="border rounded">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col md={6} className="border rounded">
								<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
							</Col>

							<Col md={6} className="border rounded">
								<GameLeader gameLeadersData={GameLeadersHelper(game, sportName)} sportName={sportName} />
							</Col>
							<Col md={1}>
								<p>BET Button</p>
							</Col>
						</Row>
					</Col>

					{/* For small screen */}
					<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
						<Row className="mt-3 mb-3 ">
							<Col sm={6} className="border rounded">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col sm={6} className="border rounded">
								<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
							</Col>

							<Col sm={6} className="border rounded">
								<GameLeader gameLeadersData={GameLeadersHelper(game, sportName)} sportName={sportName} />
							</Col>
							<Col md={1}>
								<p>BET Button</p>
							</Col>
						</Row>
					</Col>

					{/* For xs screen */}
					<Col className="mx-0 px-0 d-block d-sm-none">
						<Row className="mt-3 mb-3 ">
							<Col md={6} className="border rounded">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col sm={6} className="border rounded">
								<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
							</Col>

							<Col sm={6} className="border rounded">
								<GameLeader gameLeadersData={GameLeadersHelper(game, sportName)} sportName={sportName} />
							</Col>
							<Col md={1}>
								<p>BET Button</p>
							</Col>
						</Row>
					</Col>
				</Container>
			);
		});
	} else {
		gameItems = <h1>Loading</h1>;
	}

	return gameItems;
}

export default SportCard;
