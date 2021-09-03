import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Collapse, Carousel } from "react-bootstrap";
import axios from "axios";
import GameScore from "./GameScore";
import GamePlay from "./GamePlay";
import GameLeader from "./GameLeader";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";
import { SportDispatch } from "../contexts/Sports.Context";

function SportCard(props) {
	const dispatch = useContext(SportDispatch);
	const { sportData, sportName } = props;
	let reloadData = props.sportData.reload;
	const [multipleExpandablePanels, setMultipleExpandablePanels] = useState([]);
	const toggleMultipleExpandablePanels = (event, value) => {
		if (multipleExpandablePanels.includes(value)) {
			setMultipleExpandablePanels(multipleExpandablePanels.filter((prop) => prop !== value));
		} else {
			setMultipleExpandablePanels([...multipleExpandablePanels, value]);
		}
	};

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
						<Row className="mt-3 mb-3 border rounded">
							<Col lg={5} xxl={4} className="border-right">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col lg={3} xxl={2} className="border-right">
								<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
							</Col>

							<Col lg={3} xxl={2} className="">
								<GameLeader gameLeadersData={GameLeadersHelper(game, sportName)} sportName={sportName} />
							</Col>
							<Col lg={1}>
								<p>BET Button</p>
							</Col>
						</Row>
					</Col>

					{/* For medium screen */}
					<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
						<Row className="mt-3 mb-3 border rounded">
							<Col md={7} className="border-bottom border-right">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col md={5} className="border-bottom">
								<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
							</Col>

							<Col md={12} className="text-center">
								<div className="accordions" id="accordion">
									<span className="mx-4">BET Button</span>
									<a
										data-toggle="collapse"
										aria-expanded={multipleExpandablePanels.includes(key)}
										href="#pablo"
										onClick={(e) => toggleMultipleExpandablePanels(e, key)}
									>
										{"Button Title"} <b className="caret"></b>
									</a>
									<Collapse className="collapse" id="collapseOne" in={multipleExpandablePanels.includes(key)}>
										<Col md={12} className="">
											<GameLeader
												gameLeadersData={GameLeadersHelper(game, sportName)}
												sportName={sportName}
											/>
										</Col>
									</Collapse>
								</div>
							</Col>
						</Row>
					</Col>

					{/* For small screen */}
					<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
						<Row className="mt-3 mb-3 border rounded">
							<Col sm={12} className="border-bottom">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col sm={12} className="text-center">
								<div className="accordions" id="accordion">
									<span className="mx-4">BET Button</span>
									<a
										data-toggle="collapse"
										aria-expanded={multipleExpandablePanels.includes(key)}
										href="#pablo"
										onClick={(e) => toggleMultipleExpandablePanels(e, key)}
									>
										{"Button Title"} <b className="caret"></b>
									</a>
									<Collapse className="collapse" id="collapseOne" in={multipleExpandablePanels.includes(key)}>
										<Carousel fade>
											<Carousel.Item>
												<Row className="justify-content-center">
													<Col sm={9} className="">
														<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
													</Col>
												</Row>
											</Carousel.Item>
											<Carousel.Item>
												<Row className="justify-content-center">
													<Col sm={9} className="">
														<GameLeader
															gameLeadersData={GameLeadersHelper(game, sportName)}
															sportName={sportName}
														/>
													</Col>
												</Row>
											</Carousel.Item>
										</Carousel>
									</Collapse>
								</div>
							</Col>
						</Row>
					</Col>

					{/* For xs screen */}
					<Col className="mx-0 px-0 d-block d-sm-none">
						<Row className="mt-3 mb-3 border rounded">
							<Col xs={12} className="border-bottom">
								<GameScore
									key={game.uid.toString()}
									gameScoreCardData={GameScoreHelper(game, sportName)}
									sportName={sportName}
								/>
							</Col>

							<Col xs={12} className="text-center">
								<div className="accordions" id="accordion">
									<span className="mx-4">BET Button</span>
									<a
										data-toggle="collapse"
										aria-expanded={multipleExpandablePanels.includes(key)}
										href="#pablo"
										onClick={(e) => toggleMultipleExpandablePanels(e, key)}
									>
										{"Button Title"} <b className="caret"></b>
									</a>
									<Collapse className="collapse" id="collapseOne" in={multipleExpandablePanels.includes(key)}>
										<Carousel fade>
											<Carousel.Item>
												<Row className="justify-content-center">
													<Col xs={9} className="">
														<GamePlay gamePlayData={GamePlayHelper(game, sportName)} sportName={sportName} />
													</Col>
												</Row>
											</Carousel.Item>
											<Carousel.Item>
												<Row className="justify-content-center">
													<Col xs={9} className="">
														<GameLeader
															gameLeadersData={GameLeadersHelper(game, sportName)}
															sportName={sportName}
														/>
													</Col>
												</Row>
											</Carousel.Item>
										</Carousel>
									</Collapse>
								</div>
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
