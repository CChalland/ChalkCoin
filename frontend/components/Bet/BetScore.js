import { Container, Row, Col, Image, Card } from "react-bootstrap";
import moment from "moment";

function BetScores({ betGameScoreData, screenSize }) {
	const gameTime = moment(betGameScoreData.date);
	const daysUntil = gameTime.diff(new Date(), "days");
	const [day, date, month] = gameTime.format("ddd,Do,MMM").split(",");

	const betScoreHelper = (gameData) => {
		let scoreCard, awayScore, homeScore;
		if (gameData.status.type.state === "pre") {
			if (daysUntil > 6) {
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{month}</p>
							<p className="text-center my-2">{date}</p>
						</Card>
					</Col>
				);
			} else if (daysUntil > 1) {
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{day}</p>
							<p className="text-center my-2">{date}</p>
						</Card>
					</Col>
				);
			} else {
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{day}</p>
							<p className="text-center my-2">{date}</p>
						</Card>
					</Col>
				);
			}
		} else if (gameData.status.type.state === "in") {
			if (betGameScoreData.sportName === "MLB") {
				const [topBot, inning] = betGameScoreData.detail.split(" ");
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{inning}</p>
							<p className="text-center my-2">{topBot}</p>
						</Card>
					</Col>
				);
			} else if (betGameScoreData.sportName === "NFL") {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{period}</p>
							<p className="text-center my-2">{time}</p>
						</Card>
					</Col>
				);
			} else if (betGameScoreData.sportName === "NCAA Football") {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{period}</p>
							<p className="text-center my-2">{time}</p>
						</Card>
					</Col>
				);
			} else {
				const time = betGameScoreData.detail.split(" ")[0];
				const period = betGameScoreData.detail.split(" ")[2];
				scoreCard = (
					<Col xs={3} sm="auto" className="mt-2 text-secondary">
						<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
							<p className="text-danger text-center my-1 border-bottom">{period}</p>
							<p className="text-center my-2">{time}</p>
						</Card>
					</Col>
				);
			}
			awayScore = <p className="font-weight-bold mr-auto">{gameData.away.score}</p>;
			homeScore = <p className="font-weight-bold mr-auto">{gameData.home.score}</p>;
		} else if (gameData.status.type.name === "STATUS_FINAL") {
			awayScore = <p className="font-weight-bold mr-auto">{gameData.away.score}</p>;
			homeScore = <p className="font-weight-bold mr-auto">{gameData.home.score}</p>;
		}

		return { scoreCard, awayScore, homeScore };
	};

	const { scoreCard, awayScore, homeScore } = betScoreHelper(betGameScoreData);
	return (
		<Col sm={7} md={5} lg={7} xl={4}>
			<Row className="">
				{scoreCard}
				<Col xs={9} sm={8} className="">
					<Row className="mt-1 mb-3">
						<Col xs={"auto"} sm={4} lg={3} className="">
							<Image width={35} height={35} src={betGameScoreData.away.logo} alt="away" rounded />
						</Col>
						<Col xs={"auto"} sm={5} lg={6} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.away.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.away.records[0].summary}, ${betGameScoreData.away.records[1].summary} ${betGameScoreData.away.homeAway})`}
							</Row>
						</Col>
						<Col xs={3} sm={3} lg={3} className="mr-0 pr-0">
							{awayScore}
						</Col>
					</Row>

					<Row className="mt-3">
						<Col xs={"auto"} sm={4} lg={3} className="">
							<Image width={35} height={35} src={betGameScoreData.home.logo} alt="home" rounded />
						</Col>
						<Col xs={"auto"} sm={5} lg={6} className="">
							<Row className="mb-0 h5" style={{ fontSize: 16 }}>
								{betGameScoreData.home.name}
							</Row>
							<Row className="mb-0 text-secondary" style={{ fontSize: 11 }}>
								{`(${betGameScoreData.home.records[0].summary}, ${betGameScoreData.home.records[1].summary} ${betGameScoreData.home.homeAway})`}
							</Row>
						</Col>
						<Col xs={3} sm={3} lg={3} className="mr-0 pr-0">
							{homeScore}
						</Col>
					</Row>
				</Col>
			</Row>
		</Col>
	);
}

export default BetScores;
