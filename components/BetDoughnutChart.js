import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
import { TeamColors } from "../../helpers/TeamColors";

class BetDoughnutChart extends Component {
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();

		this.renderEventChart = this.renderEventChart.bind(this);
	}

	componentDidUpdate() {
		this.myChart.data.labels = this.props.data.map(d => d.label);
		this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
		this.myChart.update();
	}

	componentDidMount() {
		this.myChart = new Chart(this.canvasRef.current, {
			type: "doughnut",
			options: {
				maintainAspectRatio: false
			},
			data: {
				labels: this.props.data.map(d => d.label),
				datasets: [
					{
						data: this.props.data.map(d => d.value),
						backgroundColor: this.props.colors
					}
				]
			}
		});
	}

	renderEventChart() {
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
		return <div>{this.renderEventCard()}</div>;
	}
}

export default BetDoughnutChart;
