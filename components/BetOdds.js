import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

function BetOdds({ betGameOdds }) {
	const data = {
		datasets: [
			{
				data: [34.7, 65.0],
				backgroundColor: [betGameOdds.home.color, betGameOdds.away.color],
			},
		],
	};

	return (
		<Container fuild="true">
			<Row className="">
				<Col className="text-secondary" style={{ fontSize: 14 }}>
					{"Matchup Predictor"}
				</Col>
				<Col></Col>
			</Row>
			<Row>
				<Col>{`${data.datasets[0].data[1]}%`}</Col>
				<Col xs="auto">
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
				<Col>{`${data.datasets[0].data[0]}%`}</Col>
			</Row>
		</Container>
	);
}

export default BetOdds;
