import React, { useState } from "react";
import { Row, Col, Button, Collapse, Carousel, Card } from "react-bootstrap";
import GameScore from "./GameScore";
import GamePlay from "./GamePlay";
import GameLeader from "./GameLeader";
import BetModal from "../Bet/BetModal";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper, BetModalHelper } from "../../helpers/SportCard";
import { GetPlaysData, GamePlayHelperTest } from "../../test/footballHelperJSON";

function GameCard(props) {
	const { panelKey, gameData, sportName, users, currentUser, completed } = props;
	const [multipleExpandablePanels, setMultipleExpandablePanels] = useState([]);
	const toggleMultipleExpandablePanels = (event, value) => {
		if (multipleExpandablePanels.includes(value)) {
			setMultipleExpandablePanels(multipleExpandablePanels.filter((prop) => prop !== value));
		} else {
			setMultipleExpandablePanels([...multipleExpandablePanels, value]);
		}
	};
	let infoButtonClass = multipleExpandablePanels.includes(panelKey)
		? "btn-round btn-wd btn-outline"
		: "btn-round btn-wd";

	let tempGameData = completed
		? {
				...gameData,
				competitions: [{ ...gameData.competitions[0], situation: GetPlaysData()[0] }],
		  }
		: gameData;

	// console.log("GameCard - gameData", gameData);

	return (
		<>
			{/* For extra lage screen */}
			<Col className="d-none d-xl-block">
				<Card className="my-0 py-0">
					<Row className="mx-0 px-0">
						<Col lg={5} xxl={4} className="border-right">
							<GameScore
								key={gameData.uid.toString()}
								gameScoreCardData={GameScoreHelper(gameData, sportName)}
							/>
						</Col>

						<Col lg={3} xxl={2} className="border-right">
							{/* <GamePlay gamePlayData={GamePlayHelper(gameData, sportName)} sportName={sportName} /> */}
							<GamePlay gamePlayData={GamePlayHelper(tempGameData, sportName)} sportName={sportName} />
						</Col>

						<Col lg={4} xxl={2} className="">
							<GameLeader
								gameLeadersData={GameLeadersHelper(gameData, sportName)}
								sportName={sportName}
								screenSize={"xl"}
							/>
						</Col>
						<BetModal
							currentUser={currentUser}
							users={users}
							buttonClassName={"btn-wd"}
							gameBetData={BetModalHelper(gameData, sportName)}
						/>
					</Row>
				</Card>
			</Col>

			{/* For large screen */}
			<Col className="mx-0 px-0 d-none d-lg-block d-xl-none">
				<Card>
					<Row className="mx-0 px-0">
						<Col md={7} className=" border-right">
							<GameScore
								key={gameData.uid.toString()}
								gameScoreCardData={GameScoreHelper(gameData, sportName)}
							/>
						</Col>

						<Col md={5} className="">
							{/* <GamePlay gamePlayData={GamePlayHelper(gameData, sportName)} sportName={sportName} /> */}
							<GamePlay gamePlayData={GamePlayHelper(tempGameData, sportName)} sportName={sportName} />
						</Col>

						<Col md={12} className="text-center">
							<div className="accordions" id="accordion">
								<BetModal
									currentUser={currentUser}
									users={users}
									buttonClassName={"btn-round btn-wd"}
									gameBetData={BetModalHelper(gameData, sportName)}
								/>

								<Button
									className={infoButtonClass}
									type="button"
									variant="info"
									style={{ minWidth: "100%", width: "100%", minHeight: "100%", height: "100%" }}
									data-toggle="collapse"
									aria-expanded={multipleExpandablePanels.includes(panelKey)}
									onClick={(e) => toggleMultipleExpandablePanels(e, panelKey)}
								>
									<span className="btn-label">
										<i className="fas fa-exclamation"></i>
									</span>
									Info
								</Button>
								<Collapse
									className="collapse"
									id="collapseOne"
									in={multipleExpandablePanels.includes(panelKey)}
								>
									<Col md={12} className="">
										<GameLeader
											gameLeadersData={GameLeadersHelper(gameData, sportName)}
											sportName={sportName}
											screenSize={"lg"}
										/>
									</Col>
								</Collapse>
							</div>
						</Col>
					</Row>
				</Card>
			</Col>

			{/* For medium screen */}
			<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
				<Card>
					<Row className="mx-0 px-0">
						<Col md={7} className=" border-right">
							<GameScore
								key={gameData.uid.toString()}
								gameScoreCardData={GameScoreHelper(gameData, sportName)}
							/>
						</Col>

						<Col md={5} className="">
							{/* <GamePlay gamePlayData={GamePlayHelper(gameData, sportName)} sportName={sportName} /> */}
							<GamePlay gamePlayData={GamePlayHelper(tempGameData, sportName)} sportName={sportName} />
						</Col>

						<Col md={12} className="text-center">
							<div className="accordions" id="accordion">
								<BetModal
									currentUser={currentUser}
									users={users}
									buttonClassName={"btn-round btn-wd"}
									gameBetData={BetModalHelper(gameData, sportName)}
								/>
								<Button
									className={infoButtonClass}
									type="button"
									variant="info"
									style={{ minWidth: "100%", width: "100%", minHeight: "100%", height: "100%" }}
									data-toggle="collapse"
									aria-expanded={multipleExpandablePanels.includes(panelKey)}
									onClick={(e) => toggleMultipleExpandablePanels(e, panelKey)}
								>
									<span className="btn-label">
										<i className="fas fa-exclamation"></i>
									</span>
									Info
								</Button>
								<Collapse
									className="collapse"
									id="collapseOne"
									in={multipleExpandablePanels.includes(panelKey)}
								>
									<Col md={12} className="">
										<GameLeader
											gameLeadersData={GameLeadersHelper(gameData, sportName)}
											sportName={sportName}
											screenSize={"md"}
										/>
									</Col>
								</Collapse>
							</div>
						</Col>
					</Row>
				</Card>
			</Col>

			{/* For small screen */}
			<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
				<Card>
					<Row className="mx-0 px-0">
						<Col sm={12} className="">
							<GameScore
								key={gameData.uid.toString()}
								gameScoreCardData={GameScoreHelper(gameData, sportName)}
							/>
						</Col>

						<Col sm={12} className="text-center">
							<div className="accordions" id="accordion">
								<BetModal
									currentUser={currentUser}
									users={users}
									buttonClassName={"btn-round btn-wd"}
									gameBetData={BetModalHelper(gameData, sportName)}
								/>
								<Button
									className={infoButtonClass}
									type="button"
									variant="info"
									style={{ minWidth: "100%", width: "100%", minHeight: "100%", height: "100%" }}
									data-toggle="collapse"
									aria-expanded={multipleExpandablePanels.includes(panelKey)}
									onClick={(e) => toggleMultipleExpandablePanels(e, panelKey)}
								>
									<span className="btn-label">
										<i className="fas fa-exclamation"></i>
									</span>
									Info
								</Button>
								<Collapse
									className="collapse"
									id="collapseOne"
									in={multipleExpandablePanels.includes(panelKey)}
								>
									<Carousel fade>
										<Carousel.Item>
											<Row className="justify-content-center">
												<Col sm={9} className="">
													{/* <GamePlay
														gamePlayData={GamePlayHelper(gameData, sportName)}
														sportName={sportName}
													/> */}
													<GamePlay
														gamePlayData={GamePlayHelper(tempGameData, sportName)}
														sportName={sportName}
													/>
												</Col>
											</Row>
										</Carousel.Item>
										<Carousel.Item>
											<Row className="justify-content-center">
												<Col sm={9} className="">
													{/* <GameLeader
														gameLeadersData={GameLeadersHelper(gameData, sportName)}
														sportName={sportName}
														screenSize={"sm"}
													/> */}
													<GamePlay
														gamePlayData={GamePlayHelper(tempGameData, sportName)}
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
				</Card>
			</Col>

			{/* For xs screen */}
			<Col className="mx-0 px-0 d-block d-sm-none">
				<Card>
					<Row className="mx-0 px-0">
						<Col xs={12} className="">
							<GameScore
								key={gameData.uid.toString()}
								gameScoreCardData={GameScoreHelper(gameData, sportName)}
							/>
						</Col>

						<Col xs={12} className="text-center">
							<div className="accordions" id="accordion">
								<BetModal
									currentUser={currentUser}
									users={users}
									buttonClassName={"btn-round btn-wd"}
									gameBetData={BetModalHelper(gameData, sportName)}
								/>
								<Button
									className={infoButtonClass}
									type="button"
									variant="info"
									style={{ minWidth: "100%", width: "100%", minHeight: "100%", height: "100%" }}
									data-toggle="collapse"
									aria-expanded={multipleExpandablePanels.includes(panelKey)}
									onClick={(e) => toggleMultipleExpandablePanels(e, panelKey)}
								>
									<span className="btn-label">
										<i className="fas fa-exclamation"></i>
									</span>
									Info
								</Button>
								<Collapse
									className="collapse"
									id="collapseOne"
									in={multipleExpandablePanels.includes(panelKey)}
								>
									<Carousel fade>
										<Carousel.Item>
											<Row className="justify-content-center">
												<Col xs={9} className="">
													{/* <GameLeader
														gameLeadersData={GameLeadersHelper(gameData, sportName)}
														sportName={sportName}
														screenSize={"sm"}
													/> */}
													<GamePlay
														gamePlayData={GamePlayHelper(tempGameData, sportName)}
														sportName={sportName}
													/>
												</Col>
											</Row>
										</Carousel.Item>
										<Carousel.Item>
											<Row className="justify-content-center">
												<Col xs={9} className="">
													<GameLeader
														gameLeadersData={GameLeadersHelper(gameData, sportName)}
														sportName={sportName}
														screenSize={"xs"}
													/>
												</Col>
											</Row>
										</Carousel.Item>
									</Carousel>
								</Collapse>
							</div>
						</Col>
					</Row>
				</Card>
			</Col>
		</>
	);
}

export default GameCard;
