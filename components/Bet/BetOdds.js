import React, { useState } from "react";
import { Container, Row, Col, Image, Card, Form, InputGroup } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

function BetOdds({ betGameOdds, homeWinProb, awayWinProb }) {
	const data = {
		datasets: [
			{
				data: [homeWinProb, awayWinProb],
				backgroundColor: [betGameOdds.home.color, betGameOdds.away.color],
			},
		],
	};

	return (
		<Container fuild="true">
			<Row className="my-0 py-0">
				<Col xs="auto" className="mx-0 px-0">
					<h5 className="mt-1" style={{ fontSize: 18 }}>{`${awayWinProb}%`}</h5>
				</Col>
				<Col xs="auto" className="mx-0 px-0">
					<div className="chart-relative">
						<Doughnut
							data={data}
							width={100}
							height={100}
							options={{
								cutoutPercentage: 80,
								maintainAspectRatio: false,
								responsive: false,
								tooltips: false,
							}}
						/>
						<div className="chart-absolute-center chart-text-center">
							<div className="data-chart">
								<div className="inner-circle">
									<span className="home-team">{betGameOdds.away.abbreviation}</span>
									<span className="away-team">{betGameOdds.home.abbreviation}</span>
								</div>
							</div>
						</div>
					</div>
				</Col>
				<Col className="mx-0 px-0 align-self-end">
					<h5 className="mb-2" style={{ fontSize: 18 }}>{`${homeWinProb}%`}</h5>
				</Col>
			</Row>
		</Container>
	);
}

export default BetOdds;
