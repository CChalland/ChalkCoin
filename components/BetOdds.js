import React, { useState } from "react";
import { Container, Row, Col, Image, Card, Form, InputGroup } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import Select from "react-select";

function BetOdds({ betGameOdds }) {
	const makePercentage = (value) => (value * 100).toFixed(1);
	const [awayWinProb, setAwayWinProb] = useState(betGameOdds.away.winProb);
	const [homeWinProb, setHomeWinProb] = useState(betGameOdds.home.winProb);
	const [selectedMarket, setSelectedMarket] = useState("");
	const [selectedMarketState, setSelectedMarketState] = useState(false);
	const optionsMarket = betGameOdds.odds?.map((odd) => {
		return {
			value: odd.key,
			label: odd.title,
			odds: odd.market,
		};
	});

	const data = {
		datasets: [
			{
				data: [homeWinProb, awayWinProb],
				backgroundColor: [betGameOdds.home.color, betGameOdds.away.color],
			},
		],
	};

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
	// console.log(betGameOdds);

	return (
		<Container fuild="true">
			<Row>
				<Col>{`${awayWinProb}%`}</Col>
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
				<Col>{`${homeWinProb}%`}</Col>
			</Row>
			<Row className="">
				<Col>
					<Form.Group className={selectedMarketState ? "has-success" : "has-error"}>
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
									setSelectedMarketState(true);
								}}
								options={optionsMarket}
								placeholder="Select Market"
								isSearchable={false}
								styles={styles}
							/>
						</InputGroup>
					</Form.Group>
				</Col>
			</Row>
		</Container>
	);
}

export default BetOdds;
