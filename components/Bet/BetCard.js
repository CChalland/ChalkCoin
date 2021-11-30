import { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Collapse, Button, InputGroup } from "react-bootstrap";
import { BetDispatch } from "../../contexts/Bets.Context";
import BetScore from "./BetScore";
import BetOdds from "./BetOdds";
import BetWinner from "./BetWinner";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import { BetGameData } from "../../helpers/BetCard";
import { EventFinder } from "../../helpers/EventsHelper";

const makePercentage = (value) => (value * 100).toFixed(1);
const styles = {
	container: (provided) => ({
		...provided,
		display: "inline-block",
		width: "150px",
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

function BetCard({ acceptState, bet, currentUser }) {
	const dispatch = useContext(BetDispatch);
	const betData = BetGameData(bet, currentUser.id);
	const [awayWinProb, setAwayWinProb] = useState(betData.away.winProb);
	const [homeWinProb, setHomeWinProb] = useState(betData.home.winProb);
	const [selectedMarket, setSelectedMarket] = useState("");
	const [multipleExpandablePanels, setMultipleExpandablePanels] = useState([]);
	const gameTime = moment(betData.date);
	const toggleMultipleExpandablePanels = (event, value) => {
		if (multipleExpandablePanels.includes(value)) {
			setMultipleExpandablePanels(multipleExpandablePanels.filter((prop) => prop !== value));
		} else {
			setMultipleExpandablePanels([...multipleExpandablePanels, value]);
		}
	};
	const optionsMarket = betData.odds?.map((odd) => {
		return {
			value: odd.key,
			label: odd.title,
			odds: odd.market,
		};
	});
	const handleBet = async (bet) => {
		if (acceptState) {
			const betReqData = { betId: bet.id, currentUserId: currentUser.id };
			const res = await axios.post(`/api/acceptBet`, betReqData);
			dispatch({ type: "ACCEPTED BET", bet: await EventFinder(res.data) });
		}
	};
	const acceptButton = acceptState ? (
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
	) : null;

	let cardBorder, startTime;
	let matchupPredictor = { header: null, body: null, footer: null };
	if (awayWinProb && homeWinProb) {
		matchupPredictor.header = (
			<Col xs={5} md={4} lg={5} xl={3} className="mx-0 px-0">
				<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
					MATCHUP PREDICTOR
				</h4>
			</Col>
		);
		matchupPredictor.body = (
			<Col xs={11} sm={5} md={4} lg={5} xl={3} className="mx-0 px-0">
				<BetOdds betGameOdds={betData} awayWinProb={awayWinProb} homeWinProb={homeWinProb} />
			</Col>
		);
		matchupPredictor.footer = (
			<Col xs={11} sm={5} md={4} lg={5} xl={3} className="mx-0 px-0">
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
		);
	}

	if (betData.status.type.name === "STATUS_POSTPONED") startTime = betData.status.type.shortDetail;
	else if (betData.status.type.name === "STATUS_FINAL") startTime = "GAME ENDED";
	else if (betData.status.type.state === "in") startTime = "GAME STARTED";
	else startTime = `@ ${gameTime.format("h:mm a")}`;

	if (betData.openStatus === "danger") cardBorder = "#FB404B";
	else if (betData.openStatus === "warning") cardBorder = "#FFA534";
	else if (betData.openStatus === "info") cardBorder = "#23CCEF";

	// console.log("BetCard - bet", bet);
	// console.log("BetCard - betData", betData);

	return (
		<Row>
			{/* For extra lage screen */}
			<Col xxl={{ span: 9, offset: 1 }} className="d-none d-xl-block">
				<Card style={{ border: `1px solid ${cardBorder}` }}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col xl={4}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							{matchupPredictor.header}
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
							<BetScore betGameScoreData={betData} screenSize={"xl"} />
							{matchupPredictor.body}
							<Col xl={3}>
								<BetWinner
									betWinnerData={{ amount: betData.amount, acceptingTeam: betData.displayedWinner }}
								/>
							</Col>
							<Col xl={1} className="mx-0 px-0 my-4">
								{acceptButton}
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
							{matchupPredictor.footer}
							<Col xl={3}></Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>

			{/* For large screen */}
			<Col className="mx-0 px-0 d-none d-lg-block d-xl-none">
				<Card style={{ border: `1px solid ${cardBorder}` }}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col lg={7}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							{matchupPredictor.header}
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row className="">
							<BetScore betGameScoreData={betData} screenSize={"lg"} />
							{matchupPredictor.body}
						</Row>
					</Card.Body>
					<Card.Footer className="my-0 py-0">
						<Row>
							<Col lg={7}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							{matchupPredictor.footer}
						</Row>
					</Card.Footer>
					<Card.Header>
						<Row className="">
							<Col lg={7}>
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
							<Col lg={7}>
								<BetWinner
									betWinnerData={{ amount: betData.amount, acceptingTeam: betData.displayedWinner }}
								/>
							</Col>
							<Col lg={1} className="mx-0 px-0 my-4">
								{acceptButton}
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>

			{/* For medium screen */}
			<Col className="mx-0 px-0 d-none d-md-block d-lg-none">
				<Card style={{ border: `1px solid ${cardBorder}` }}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col md={5}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							{matchupPredictor.header}
							<Col md={3} className="mx-0 px-0">
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
							<BetScore betGameScoreData={betData} screenSize={"md"} />
							{matchupPredictor.body}
							<Col md={3} className="mx-0 px-0">
								<BetWinner
									betWinnerData={{ amount: betData.amount, acceptingTeam: betData.displayedWinner }}
								/>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="my-0">
						<Row className="align-items-center">
							<Col md={5}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							{matchupPredictor.footer}
							<Col>{acceptButton}</Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>

			{/* For small screen */}
			<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
				<Card style={{ border: `1px solid ${cardBorder}` }}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col sm={7}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
							{matchupPredictor.header}
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row className="">
							<BetScore betGameScoreData={betData} screenSize={"sm"} />
							{matchupPredictor.body}
						</Row>
					</Card.Body>
					<Card.Footer className="my-0 py-0">
						<Row>
							<Col sm={7}>
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							{matchupPredictor.footer}
						</Row>
					</Card.Footer>
					<Card.Header>
						<Row className="">
							<Col sm={7}>
								<Row className="justify-content-between">
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
						<Row className="align-items-center ">
							<Col sm={7}>
								<BetWinner
									betWinnerData={{ amount: betData.amount, acceptingTeam: betData.displayedWinner }}
								/>
							</Col>
							<Col className="">{acceptButton}</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>

			{/* For xs screen */}
			<Col className="mx-0 px-0 d-block d-sm-none">
				<Card style={{ border: `1px solid ${cardBorder}` }}>
					<Card.Header className="my-0 py-0">
						<Row className="">
							<Col xs={12}>
								<h4 className="my-0" style={{ fontSize: 16 }}>
									{startTime}
								</h4>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="my-0 py-0">
						<Row>
							<BetScore betGameScoreData={betData} screenSize={"xs"} />
						</Row>
						<Row className="justify-content-between">
							<Col xs="auto">
								<h4 className="my-0" style={{ fontSize: 14 }}>
									{`${betData.venue.fullName}`}
								</h4>
							</Col>
							<Col xs="auto">
								<Button
									className="btn-round btn-outline"
									type="button"
									variant="info"
									data-toggle="collapse"
									aria-expanded={multipleExpandablePanels.includes(1)}
									onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
								>
									<span className="btn-label">
										<i className="nc-icon nc-notes"></i>
									</span>
								</Button>
							</Col>
						</Row>

						<Collapse
							className="collapse my-0 py-0"
							id="collapseOne"
							in={multipleExpandablePanels.includes(1)}
						>
							<Row className="justify-content-center">
								{matchupPredictor.body}
								{matchupPredictor.footer}
							</Row>
						</Collapse>

						<Row className="">
							<Col xs={12}>
								<Row>
									<Col className="">
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											AMOUNT
										</h4>
									</Col>
									<Col className="">
										<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
											TO WIN
										</h4>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className="align-items-center ">
							<Col xs={12}>
								<BetWinner
									betWinnerData={{ amount: betData.amount, acceptingTeam: betData.displayedWinner }}
								/>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer>
						<Row>
							<Col xs={{ span: 4, offset: 2 }}>{acceptButton}</Col>
						</Row>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	);
}

export default BetCard;
