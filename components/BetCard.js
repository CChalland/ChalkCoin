import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, InputGroup } from "react-bootstrap";
import { BetDispatch } from "../contexts/Bets.Context";
import BetScore from "./BetScore";
import BetOdds from "./BetOdds";
import BetWinner from "./BetWinner";
import axios from "axios";
import Select from "react-select";
import moment from "moment";

const makePercentage = (value) => (value * 100).toFixed(1);
const styles = {
	container: (provided) => ({
		...provided,
		display: "inline-block",
		width: "175px",
		minHeight: "1px",
		textAlign: "left",
		border: "none",
	}),
	control: (provided) => ({
		...provided,
		minHeight: "1px",
		height: "25px",
	}),
	input: (provided) => ({
		...provided,
		minHeight: "1px",
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		minHeight: "1px",
		paddingTop: "0",
		paddingBottom: "0",
	}),
	indicatorSeparator: (provided) => ({
		...provided,
		minHeight: "1px",
		height: "6px",
	}),
	clearIndicator: (provided) => ({
		...provided,
		minHeight: "1px",
	}),
	valueContainer: (provided) => ({
		...provided,
		minHeight: "1px",
		height: "20px",
		paddingTop: "0",
		paddingBottom: "0",
	}),
	singleValue: (provided) => ({
		...provided,
		minHeight: "1px",
		paddingBottom: "2px",
	}),
};

function BetCard({ betData, currentUser }) {
	const dispatch = useContext(BetDispatch);
	const [awayWinProb, setAwayWinProb] = useState(betData.away.winProb);
	const [homeWinProb, setHomeWinProb] = useState(betData.home.winProb);
	const [selectedMarket, setSelectedMarket] = useState("");

	const optionsMarket = betData.odds?.map((odd) => {
		return {
			value: odd.key,
			label: odd.title,
			odds: odd.market,
		};
	});
	const betWinnerData = {
		amount: betData.amount,
		acceptingTeam: betData.away.requesterTeam ? betData.home : betData.away,
	};
	const handleBet = async (bet) => {
		const betReqData = { betId: bet.id, currentUserId: currentUser.id };
		await axios.post("http://localhost:4000/api/acceptBet", betReqData).then((res) => {
			dispatch({ type: "ACCEPTED BET", bet: res.data });
		});
	};
	const gameTime = moment(betData.date);
	const daysDiff = gameTime.diff(new Date(), "days");
	const minutesDiff = gameTime.diff(new Date(), "minutes");

	let cardBorderColor, startTime;
	if (betData.status.type.state === "post") startTime = "GAME ENDED";
	else if (betData.status.type.state === "in") {
		startTime = "GAME STARTED";
		if (minutesDiff > -15) cardBorderColor = "danger";
	} else if (betData.status.type.state === "pre" && daysDiff === 0) {
		startTime = `@ ${gameTime.format("h:mm a")}`;
		if (minutesDiff < 60) cardBorderColor = "warning";
		else cardBorderColor = "info";
	} else startTime = `@ ${gameTime.format("h:mm a")}`;

	return (
		<Row>
			{/* For extra lage screen */}
			<Col xl={{ span: 9, offset: 1 }} className="d-none d-xl-block">
				<Card border={cardBorderColor}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
									MATCHUP PREDICTOR
								</h4>
							</Col>
							<Col xl={3}>
								<Row>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											AMOUNT
										</h4>
									</Col>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											TO WIN
										</h4>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row className="">
							<Col xl={4} className="">
								<BetScore betGameScoreData={betData} />
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<BetOdds betGameOdds={betData} awayWinProb={awayWinProb} homeWinProb={homeWinProb} />
							</Col>
							<Col xl={3}>
								<BetWinner betWinnerData={betWinnerData} />
							</Col>
							<Col xl={1} className="mx-0 px-0 my-4">
								<Button
									className="btn-round btn-wd"
									type="button"
									variant="success"
									onClick={() => {
										handleBet(betData);
									}}
								>
									<span className="btn-label">
										<i className="fas fa-plus"></i>
									</span>
									Accept
								</Button>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="my-0 py-0">
						<Row>
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<InputGroup size="sm">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="nc-icon nc-bank"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Select
										name="selectedMarket"
										value={selectedMarket}
										onChange={(value) => {
											setAwayWinProb(makePercentage(value.odds.away.winProbability));
											setHomeWinProb(makePercentage(value.odds.home.winProbability));
											setSelectedMarket(value);
										}}
										options={optionsMarket}
										placeholder="Select Market"
										isSearchable={false}
										styles={styles}
									/>
								</InputGroup>
							</Col>
							<Col xl={3}></Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>

			{/* For large screen */}
			<Col className="mx-0 px-0 d-none d-lg-block d-xl-none">
				<Card border={cardBorderColor}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
									MATCHUP PREDICTOR
								</h4>
							</Col>
							<Col xl={3}>
								<Row>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											AMOUNT
										</h4>
									</Col>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											TO WIN
										</h4>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row className="">
							<Col xl={4} className="">
								<BetScore betGameScoreData={betData} />
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<BetOdds betGameOdds={betData} awayWinProb={awayWinProb} homeWinProb={homeWinProb} />
							</Col>
							<Col xl={3}>
								<BetWinner betWinnerData={betWinnerData} />
							</Col>
							<Col xl={1} className="mx-0 px-0 my-4">
								<Button
									className="btn-round btn-wd"
									type="button"
									variant="success"
									onClick={() => {
										handleBet(betData);
									}}
								>
									<span className="btn-label">
										<i className="fas fa-plus"></i>
									</span>
									Accept
								</Button>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="my-0 py-0">
						<Row>
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<InputGroup size="sm">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="nc-icon nc-bank"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Select
										name="selectedMarket"
										value={selectedMarket}
										onChange={(value) => {
											setAwayWinProb(makePercentage(value.odds.away.winProbability));
											setHomeWinProb(makePercentage(value.odds.home.winProbability));
											setSelectedMarket(value);
										}}
										options={optionsMarket}
										placeholder="Select Market"
										isSearchable={false}
										styles={styles}
									/>
								</InputGroup>
							</Col>
							<Col xl={3}></Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>

			{/* For medium screen */}
			<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
				<Card border={cardBorderColor}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
									MATCHUP PREDICTOR
								</h4>
							</Col>
							<Col xl={3}>
								<Row>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											AMOUNT
										</h4>
									</Col>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											TO WIN
										</h4>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row className="">
							<Col xl={4} className="">
								<BetScore betGameScoreData={betData} />
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<BetOdds betGameOdds={betData} awayWinProb={awayWinProb} homeWinProb={homeWinProb} />
							</Col>
							<Col xl={3}>
								<BetWinner betWinnerData={betWinnerData} />
							</Col>
							<Col xl={1} className="mx-0 px-0 my-4">
								<Button
									className="btn-round btn-wd"
									type="button"
									variant="success"
									onClick={() => {
										handleBet(betData);
									}}
								>
									<span className="btn-label">
										<i className="fas fa-plus"></i>
									</span>
									Accept
								</Button>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="my-0 py-0">
						<Row>
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<InputGroup size="sm">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="nc-icon nc-bank"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Select
										name="selectedMarket"
										value={selectedMarket}
										onChange={(value) => {
											setAwayWinProb(makePercentage(value.odds.away.winProbability));
											setHomeWinProb(makePercentage(value.odds.home.winProbability));
											setSelectedMarket(value);
										}}
										options={optionsMarket}
										placeholder="Select Market"
										isSearchable={false}
										styles={styles}
									/>
								</InputGroup>
							</Col>
							<Col xl={3}></Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>

			{/* For small screen */}
			<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
				<Card border={cardBorderColor}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
									MATCHUP PREDICTOR
								</h4>
							</Col>
							<Col xl={3}>
								<Row>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											AMOUNT
										</h4>
									</Col>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											TO WIN
										</h4>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row className="">
							<Col xl={4} className="">
								<BetScore betGameScoreData={betData} />
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<BetOdds betGameOdds={betData} awayWinProb={awayWinProb} homeWinProb={homeWinProb} />
							</Col>
							<Col xl={3}>
								<BetWinner betWinnerData={betWinnerData} />
							</Col>
							<Col xl={1} className="mx-0 px-0 my-4">
								<Button
									className="btn-round btn-wd"
									type="button"
									variant="success"
									onClick={() => {
										handleBet(betData);
									}}
								>
									<span className="btn-label">
										<i className="fas fa-plus"></i>
									</span>
									Accept
								</Button>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="my-0 py-0">
						<Row>
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<InputGroup size="sm">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="nc-icon nc-bank"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Select
										name="selectedMarket"
										value={selectedMarket}
										onChange={(value) => {
											setAwayWinProb(makePercentage(value.odds.away.winProbability));
											setHomeWinProb(makePercentage(value.odds.home.winProbability));
											setSelectedMarket(value);
										}}
										options={optionsMarket}
										placeholder="Select Market"
										isSearchable={false}
										styles={styles}
									/>
								</InputGroup>
							</Col>
							<Col xl={3}></Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>

			{/* For xs screen */}
			<Col className="mx-0 px-0 d-block d-sm-none">
				<Card border={cardBorderColor}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
									MATCHUP PREDICTOR
								</h4>
							</Col>
							<Col xl={3}>
								<Row>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											AMOUNT
										</h4>
									</Col>
									<Col>
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											TO WIN
										</h4>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row className="">
							<Col xl={4} className="">
								<BetScore betGameScoreData={betData} />
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<BetOdds betGameOdds={betData} awayWinProb={awayWinProb} homeWinProb={homeWinProb} />
							</Col>
							<Col xl={3}>
								<BetWinner betWinnerData={betWinnerData} />
							</Col>
							<Col xl={1} className="mx-0 px-0 my-4">
								<Button
									className="btn-round btn-wd"
									type="button"
									variant="success"
									onClick={() => {
										handleBet(betData);
									}}
								>
									<span className="btn-label">
										<i className="fas fa-plus"></i>
									</span>
									Accept
								</Button>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="my-0 py-0">
						<Row>
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							<Col xl={3} className="mx-0 px-0">
								<InputGroup size="sm">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="nc-icon nc-bank"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Select
										name="selectedMarket"
										value={selectedMarket}
										onChange={(value) => {
											setAwayWinProb(makePercentage(value.odds.away.winProbability));
											setHomeWinProb(makePercentage(value.odds.home.winProbability));
											setSelectedMarket(value);
										}}
										options={optionsMarket}
										placeholder="Select Market"
										isSearchable={false}
										styles={styles}
									/>
								</InputGroup>
							</Col>
							<Col xl={3}></Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	);
}

export default BetCard;
