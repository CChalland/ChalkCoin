import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class GameLeader extends Component {
	constructor(props) {
		super(props);
		this.state;
	}

	renderGameLeaders() {
		const { gameLeadersData } = this.props;
		const homeLeader = gameLeadersData.home
			? gameLeadersData.home[gameLeadersData.home.length - 1].leaders[0]
			: null;
		const awayLeader = gameLeadersData.away
			? gameLeadersData.away[gameLeadersData.away.length - 1].leaders[0]
			: null;

		console.log(awayLeader);
		console.log(homeLeader);

		if (homeLeader) {
			return (
				<Container>
					<Row>
						<h6>{"Players to Watch"}</h6>
					</Row>

					<Row>
						<Col>
							<Image width={45} height={40} src={awayLeader.athlete.headshot} roundedCircle />
						</Col>
						<Col>
							<Row>
								<h5>{awayLeader.athlete.displayName}</h5>
							</Row>
							<Row>{awayLeader.displayValue}</Row>
						</Col>
					</Row>

					<Row>
						<Col>
							<Image width={45} height={40} src={homeLeader.athlete.headshot} roundedCircle />
						</Col>
						<Col>
							<Row>
								<h5>{homeLeader.athlete.displayName}</h5>
							</Row>
							<Row>{homeLeader.displayValue}</Row>
						</Col>
					</Row>
				</Container>
			);
		} else {
			return null;
		}
	}

	render() {
		return this.renderGameLeaders();
	}
}

export default GameLeader;
