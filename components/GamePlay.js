import React, { useState } from "react";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";

function GamePlay(props) {
	const [modalShow, setModalShow] = useState(false);

	const baseballHelper = (situation) => {
		const styles = {
			grid: {
				paddingLeft: 0,
				paddingRight: 0,
			},
			row: {
				marginLeft: 8,
				marginRight: 0,
			},
			col: {
				paddingLeft: 0,
				paddingRight: 0,
			},
			center: {
				paddingLeft: 0,
				paddingRight: 0,
			},
		};
		let balls = new Array(4).fill(<span className="circle balls"></span>);
		let strikes = new Array(3).fill(<span className="circle strikes"></span>);
		let outs = new Array(3).fill(<span className="circle outs"></span>);

		for (let i = 0; i < situation.balls; i++) {
			balls[i] = <span className="circle balls active"></span>;
		}
		for (let i = 0; i < situation.strikes; i++) {
			strikes[i] = <span className="circle strikes active"></span>;
		}
		for (let i = 0; i < situation.outs; i++) {
			outs[i] = <span className="circle outs active"></span>;
		}

		return (
			<Container fluid>
				<Row className="my-2 py-2">
					<Col className="" xs={6} md={8}>
						<Row style={styles.row}>
							<Col xs="auto" style={styles.col}>
								<div className={"diamond second-base " + (situation.onSecond ? "active" : null)}></div>
							</Col>
						</Row>
						<Row style={styles.col}>
							<Col xs="auto" style={styles.center}>
								<div className={"diamond third-base " + (situation.onThird ? "active" : null)}></div>
							</Col>
							<Col xs="auto" style={styles.col}>
								<div className={"diamond first-base " + (situation.onFirst ? "active" : null)}></div>
							</Col>
						</Row>
					</Col>
					<Col className="" xs={6} md={4}>
						<div className="circleGraphs">
							<div className="circleGraph  four">
								<span className="abbrev">B</span>
								{balls}
							</div>

							<div className="circleGraph ">
								<span className="abbrev">S</span>
								{strikes}
							</div>

							<div className="circleGraph ">
								<span className="abbrev">O</span>
								{outs}
							</div>
						</div>
					</Col>
				</Row>
				<Row className="mt-4 list-inline-item">
					<p>
						<strong className="h6">LAST PLAY</strong>
						{`: ${situation.lastPlay.text}`}
					</p>
				</Row>
			</Container>
		);
	};

	const footballHelper = (situation) => {
		return (
			<Container fluid>
				<div>{"TEST"}</div>
			</Container>
		);
	};

	const scheduledHelper = (gamePlayData) => {
		let weather, tickets, venue, odds;

		if (gamePlayData.weather) {
			let conditionId = gamePlayData.weather.conditionId;
			if (parseInt(conditionId) < 10) conditionId = "0" + conditionId;
			weather = (
				<Col className="ml-auto">
					<Row>
						<Col xs={3} className="px-0">
							<Image
								width={20}
								height={20}
								src={`https://a.espncdn.com/redesign/assets/img/icons/accuWeather/${conditionId}.png`}
							/>
						</Col>
						<Col xs={9}>{`${gamePlayData.weather.temperature} °F`}</Col>
					</Row>
				</Col>
			);
		}

		if (gamePlayData.tickets)
			tickets = (
				<Row className="py-2 border-top border-bottom">
					<a href={gamePlayData.tickets.links[0].href} target="_blank">
						{gamePlayData.tickets.summary}
					</a>
				</Row>
			);

		venue = (
			<Col xs={8} className="mr-auto">
				<Row className="mb-0 h6">{gamePlayData.venue.fullName}</Row>
				<Row>{`${gamePlayData.venue.address.city}, ${gamePlayData.venue.address.state}`}</Row>
			</Col>
		);

		if (gamePlayData.odds) {
			odds = (
				<>
					<Row className="mt-2">{`Line: ${gamePlayData.odds.details}`}</Row>
					<Row className="mb-2">{`O/U: ${gamePlayData.odds.overUnder}`}</Row>
				</>
			);
		}
		return (
			<Container>
				<Row className="mt-3 mb-2">
					{venue}
					{weather}
				</Row>
				{tickets}
				{odds}
			</Container>
		);
	};

	const videoHelper = (headlines) => {
		return (
			<>
				<figure className="mx-0 my-3 position-relative" onClick={() => setModalShow(true)}>
					<Image fluid src={headlines.video[0].thumbnail} onClick={() => setModalShow(true)} rounded />
					<span className="video-play-button">Play</span>
					<figcaption className="highlightVideoText">{headlines.video[0].headline}</figcaption>
				</figure>

				<Modal
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					show={modalShow}
					onHide={() => setModalShow(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">{headlines.video[0].headline}</Modal.Title>
					</Modal.Header>
					<Modal.Body className="m-0 p-0">
						<video width="100%" controls src={headlines.video[0].links.source.href} autoPlay />
					</Modal.Body>
				</Modal>
			</>
		);
	};

	const { gamePlayData, sportName } = props;
	let scheduled, lastPlay, headline, athletePic;

	if (
		gamePlayData.status.type.name === "STATUS_SCHEDULED" ||
		gamePlayData.status.type.name === "STATUS_POSTPONED" ||
		gamePlayData.status.type.name === "STATUS_DELAYED"
	) {
		scheduled = scheduledHelper(gamePlayData);
	} else if (gamePlayData.status.type.state === "in") {
		if (sportName === "NFL") {
			lastPlay = footballHelper(gamePlayData.situation);
		} else if (sportName === "NHL") {
		} else if (sportName === "MLB") {
			lastPlay = baseballHelper(gamePlayData.situation);
		} else {
			if (
				gamePlayData.lastPlay.type.text === "End Period" ||
				gamePlayData.lastPlay.type.text === "Official Timeout" ||
				gamePlayData.lastPlay.type.text === "No Foul"
			) {
				lastPlay = <Row className="my-3 align-items-center h6">{gamePlayData.lastPlay.text}</Row>;
				console.log("End Period - gamePlayData.lastPlay", gamePlayData.lastPlay);
			} else {
				console.log("else- gamePlayData.lastPlay", gamePlayData.lastPlay);
				athletePic = gamePlayData.lastPlay.athletes
					? gamePlayData.lastPlay.athletes[0].headshot
					: gamePlayData.lastPlay.team.logo;
				lastPlay = (
					<div>
						<Row className="my-3">
							<h6>{"Last Play"}</h6>
						</Row>
						<Row className="mb-3 align-items-center">
							<Col sm={3}>
								<Image width={45} height={40} src={athletePic} roundedCircle />
							</Col>
							<Col sm={9} className="px-0">
								{`${gamePlayData.lastPlay.team.abbreviation} - ${gamePlayData.lastPlay.text}`}
							</Col>
						</Row>
					</div>
				);
			}
		}
	} else if (gamePlayData.status.type.completed) {
		if (gamePlayData.headlines) {
			if (sportName && gamePlayData.headlines.video) {
				headline = videoHelper(gamePlayData.headlines);
			} else if (gamePlayData.headlines) {
				headline = (
					<Container fluid>
						<Row className="my-3">
							<a className="my-0 h6 text-dark" href={gamePlayData.headlines.link[0].href} target="_blank">
								{gamePlayData.headlines.shortLinkText}
							</a>
							<div>{gamePlayData.headlines.description}</div>
						</Row>
					</Container>
				);
			} else {
				headline = (
					<Container fluid>
						<Row>{"TEAM INFORMATION"}</Row>
						<Row>{gamePlayData.away.name}</Row>
						<Row>
							<Col>{"Roster"}</Col>
							<Col>{"Statistics"}</Col>
							<Col>{"Schedule"}</Col>
						</Row>
						<Row className="border"></Row>
						<Row>{gamePlayData.home.name}</Row>
						<Row>
							<Col>{"Roster"}</Col>
							<Col>{"Statistics"}</Col>
							<Col>{"Schedule"}</Col>
						</Row>
					</Container>
				);
			}
		}
	}

	return (
		<>
			{scheduled}
			{lastPlay}
			{headline}
		</>
	);
}

export default GamePlay;
