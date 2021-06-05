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
			? gameLeadersData.home[gameLeadersData.home.length - 1].leaders[0].athlete
			: null;
		const awayLeader = gameLeadersData.away
			? gameLeadersData.away[gameLeadersData.away.length - 1].leaders[0].athlete
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
							<Image width={45} height={40} src={awayLeader.headshot} roundedCircle />
						</Col>
					</Row>

					<Row>
						<Col>
							<Image width={45} height={40} src={homeLeader.headshot} roundedCircle />
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
