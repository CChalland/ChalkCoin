import React, { Component } from "react";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";

class GamePlay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
		};
	}

	baseballHelper(situation) {
		const styles = {
			grid: {
				paddingLeft: 0,
				paddingRight: 0,
			},
			row: {
				marginLeft: 5,
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
			<Container>
				<Row>
					<Col sm="auto">
						<Row style={styles.row}>
							<Col sm="auto" style={styles.col}>
								<div className={"diamond second-base " + (situation.onSecond ? "active" : null)}></div>
							</Col>
						</Row>
						<Row style={styles.col}>
							<Col sm="auto" style={styles.center}>
								<div className={"diamond third-base " + (situation.onThird ? "active" : null)}></div>
							</Col>
							<Col sm="auto" style={styles.col}>
								<div className={"diamond first-base " + (situation.onFirst ? "active" : null)}></div>
							</Col>
						</Row>
					</Col>
					<Col sm="auto">
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
				<Row>{`LAST PLAY: ${situation.lastPlay.text}`}</Row>
			</Container>
		);
	}

	scheduledHelper(gamePlayData) {
		let weather, tickets, venue, odds;

		if (gamePlayData.weather) {
			let conditionId = gamePlayData.weather.conditionId;
			if (parseInt(conditionId) < 10) conditionId = "0" + conditionId;
			weather = (
				<Col>
					<Row>
						<Col sm="auto">
							<Image
								width={20}
								height={20}
								src={`https://a.espncdn.com/redesign/assets/img/icons/accuWeather/${conditionId}.png`}
							/>
						</Col>
						<Col sm="auto">{`${gamePlayData.weather.temperature} °F`}</Col>
					</Row>
				</Col>
			);
		}

		if (gamePlayData.tickets) tickets = <Row>{gamePlayData.tickets.summary}</Row>;

		venue = (
			<Col>
				<Row>{gamePlayData.venue.fullName}</Row>
				<Row>{`${gamePlayData.venue.address.city}, ${gamePlayData.venue.address.state}`}</Row>
			</Col>
		);

		if (gamePlayData.odds) {
			odds = (
				<div>
					<Row>{`Line: ${gamePlayData.odds.details}`}</Row>
					<Row>{`O/U: ${gamePlayData.odds.overUnder}`}</Row>
				</div>
			);
		}
		return (
			<Container>
				<Row>
					{venue}
					{weather}
				</Row>
				{tickets}
				{odds}
			</Container>
		);
	}

	videoHelper(headlines) {
		console.log(headlines.video[0]);

		return (
			<Container fluid>
				<figure className="mt-3 position-relative" onClick={() => this.setState({ modalShow: true })}>
					<Image
						width={256}
						height={144}
						src={headlines.video[0].thumbnail}
						onClick={() => this.setState({ modalShow: true })}
						rounded
					/>
					<span class="video-play-button">Play</span>
					<figcaption className="highlightVideoText">{headlines.video[0].headline}</figcaption>
				</figure>

				<Modal
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					show={this.state.modalShow}
					onHide={() => this.setState({ modalShow: false })}
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">{headlines.video[0].headline}</Modal.Title>
					</Modal.Header>
					<Modal.Body className="m-0 p-0">
						<video controls src={headlines.video[0].links.source.href} autoPlay />
					</Modal.Body>
				</Modal>
			</Container>
		);
	}

	renderGamePlays() {
		const { gamePlayData, sportName } = this.props;
		let scheduled, lastPlay, headline, video;

		console.log(gamePlayData, sportName);

		if (gamePlayData.status.type.name === "STATUS_SCHEDULED") {
			scheduled = this.scheduledHelper(gamePlayData);
		} else if (gamePlayData.status.type.state === "in") {
			if (sportName === "NFL") {
			} else if (sportName === "NHL") {
			} else if (sportName === "MLB") {
				lastPlay = this.baseballHelper(gamePlayData.situation);
			} else {
				lastPlay = (
					<div>
						<Row>
							<h6>{"Last Play"}</h6>
						</Row>
						<Row>
							<Col md="auto">
								<Image width={45} height={40} src={null} roundedCircle />
							</Col>
						</Row>
					</div>
				);
			}
		} else if (gamePlayData.status.type.completed) {
			if (gamePlayData.headlines) {
				if (sportName !== "NFL" && sportName !== "WNBA" && gamePlayData.headlines.video) {
					headline = this.videoHelper(gamePlayData.headlines);
				} else {
					headline = (
						<Row>
							<div>{gamePlayData.headlines.shortLinkText}</div>
							<div>{gamePlayData.headlines.description}</div>
						</Row>
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

	render() {
		return this.renderGamePlays();
	}
}

export default GamePlay;
