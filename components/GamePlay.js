import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class GamePlay extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	baseballHelper(bases) {
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
		return (
			<Container style={styles.grid}>
				<Row>
					<Col sm="auto">
						<Row style={styles.row}>
							<Col sm="auto" style={styles.col}>
								<div className="diamond second-base active"></div>
							</Col>
						</Row>
						<Row style={styles.col}>
							<Col sm="auto" style={styles.center}>
								<div className="diamond third-base"></div>
							</Col>
							<Col sm="auto" style={styles.col}>
								<div className="diamond first-base"></div>
							</Col>
						</Row>
					</Col>
					<Col sm="auto">
						<div className="circleGraphs">
							<div className="circleGraph  four">
								<span className="abbrev">B</span>
								<span className="circle balls active"></span>
								<span className="circle balls"></span>
								<span className="circle balls "></span>
								<span className="circle balls "></span>
							</div>

							<div className="circleGraph ">
								<span className="abbrev">S</span>
								<span className="circle strikes active"></span>
								<span className="circle strikes "></span>
								<span className="circle strikes "></span>
							</div>

							<div className="circleGraph ">
								<span className="abbrev">O</span>
								<span className="circle outs active"></span>
								<span className="circle outs "></span>
								<span className="circle outs "></span>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}

	renderGamePlays() {
		const { gamePlayData, sportName } = this.props;
		let venue, weather, tickets, odds, lastPlayBaseball, lastPlay, headline;

		console.log(gamePlayData);

		if (gamePlayData.status.type.name === "STATUS_SCHEDULED") {
			if (gamePlayData.weather) {
				weather = <Col>{`${gamePlayData.weather.temperature} °F`}</Col>;
			}

			if (gamePlayData.tickets) {
				tickets = <Row>{gamePlayData.tickets.summary}</Row>;
			}

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
		} else if (gamePlayData.status.type.state === "in") {
			if (sportName === "NFL") {
			} else if (sportName === "NHL") {
				lastPlay = this.baseballHelper();
			} else if (sportName === "MLB") {
			} else {
				lastPlayBaseball = (
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
				headline = (
					<Row>
						<div>{gamePlayData.headlines.shortLinkText}</div>
						<div>{gamePlayData.headlines.description}</div>
					</Row>
				);
			}
		}

		// return this.baseballHelper();

		return (
			<Container>
				<Row>
					{venue}
					{weather}
				</Row>
				{lastPlay}
				{headline}
				{tickets}
				{odds}
			</Container>
		);
	}

	render() {
		return this.renderGamePlays();
	}
}

export default GamePlay;
