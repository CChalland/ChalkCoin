import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
import { TeamColors } from "../helpers/TeamColors";

class BetDoughnutChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamColors: {},
			spread: {},
			homeData: {},
			awayData: {}
		};

		this.canvasRef = React.createRef();

		this.renderEventChart = this.renderEventChart.bind(this);
	}

	componentDidMount() {
		const { eventsData, firstBettingIndex } = this.props;

		console.log(eventsData);
		console.log(eventSport);

		let homeData = eventsData.teams_normalized
			.filter(team => {
				return team.is_home;
			})
			.map(team => {
				return {
					teamName: team.name,
					teamMascot: team.mascot,
					teamAbbreviation: team.abbreviation
				};
			});
		let awayData = eventsData.teams_normalized
			.filter(team => {
				return team.is_away;
			})
			.map(team => {
				return {
					teamName: team.name,
					teamMascot: team.mascot,
					teamAbbreviation: team.abbreviation
				};
			});

		let homeTeamName = `${homeData[0].teamName} ${homeData[0].teamMascot}`;
		let awayTeamName = `${awayData[0].teamName} ${awayData[0].teamMascot}`;
		let eventSport;
		let teamColors;
		if (eventSport === "MLS") {
			teamColors = TeamColors(eventSport, homeTeamName.split(" ").join(""), awayTeamName.split(" ").join(""));
		} else {
			teamColors = TeamColors(eventSport, homeData[0].teamMascot, awayData[0].teamMascot);
		}

		let spreadMoneylineFullGame = eventsData.line_periods[firstBettingIndex].period_full_game.moneyline;

		this.setState({
			spread: spreadMoneylineFullGame,
			homeData: homeData[0],
			awayData: awayData[0],
			teamColors
		});
	}

	renderEventChart() {
		const { eventSport } = this.props;
		const { homeData, awayData, spread, teamColors } = this.state;

		// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
		let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
		Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
			draw: function() {
				originalDoughnutDraw.apply(this, arguments);

				let chart = this.chart;
				let width = chart.chart.width,
					height = chart.chart.height,
					ctx = chart.chart.ctx;

				let fontSize = (height / 175).toFixed(2);
				ctx.font = fontSize + "em sans-serif";
				ctx.textBaseline = "middle";

				let text = chart.config.data.text,
					textX = Math.round((width - ctx.measureText(text).width) / 2),
					textY = height / 2;

				ctx.fillText(text, textX, textY);
			}
		});
		let doughnutData = {
			labels: [homeData.teamAbbreviation, awayData.teamAbbreviation],
			datasets: [
				{
					data: [spread.moneyline_home, spread.moneyline_away],
					backgroundColor: teamColors.backgroundColor,
					hoverBackgroundColor: teamColors.hoverBackgroundColor
				}
			],
			text: `${awayData.teamAbbreviation} | ${homeData.teamAbbreviation}`
		};

		let homePecentage = (
			(Math.abs(spread.moneyline_home) /
				(Math.abs(spread.moneyline_home) + Math.abs(spread.moneyline_away))) *
			100
		).toFixed(1);
		let awayPecentage = (
			(Math.abs(spread.moneyline_away) /
				(Math.abs(spread.moneyline_home) + Math.abs(spread.moneyline_away))) *
			100
		).toFixed(1);

		return (
			<div>
				<h3>{awayPecentage}%</h3>
				<Doughnut data={doughnutData} />
				<div style={{ position: "absolute", right: "50px" }}>
					<h3>{homePecentage}%</h3>
				</div>
				<br />
			</div>
		);
	}

	render() {
		return <div>{this.renderEventChart()}</div>;
	}
}

export default BetDoughnutChart;
