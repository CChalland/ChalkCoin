import React, { Component } from "react";
import { Dropdown, Card, Image, Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Router } from "../../routes";
import { SportContext } from "../../contexts/SportContext";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
import { TeamColors } from "../../helpers/TeamColors";

class BetNew extends Component {
	static contextType = SportContext;

	static async getInitialProps(props) {
		const sportId = props.query.sportId;
		const eventId = props.query.eventId;
		return { sportId, eventId };
	}

	constructor(props) {
		super(props);
		this.state = {
			betAmount: "",
			betSender: "testing",
			betRecipient: "",
			bettingTeam: "",
			bettingTeamDelta: "",
			errorMessage: "",
			loading: false,
			eventsData: {},
			eventSport: "",
			gameDetails: {},
			eventSpread: 0,
			homeData: {},
			awayData: {},
			teamColors: {},
			spread: {},
			spreadProviders: {},
			providerDropdownOptions: [],
			providerIndex: 1,
			spreadType: "period_full_game",
			selectSpreadType: [
				{ key: "period_full_game", value: "period_full_game", text: "Full Game" },
				{ key: "period_first_half", value: "period_first_half", text: "First Half" },
				{ key: "period_second_half", value: "period_second_half", text: "Second Half" },
				{ key: "period_first_period", value: "period_first_period", text: "First Period" },
				{ key: "period_second_period", value: "period_second_period", text: "Second Period" },
				{ key: "period_third_period", value: "period_third_period", text: "Third Period" },
				{ key: "period_fourth_period", value: "period_fourth_period", text: "Fourth Period" }
			],
			selectBettingTeam: [],
			stadiumImage: ""
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.renderEventCard = this.renderEventCard.bind(this);
		this.eventCardTitle = this.eventCardTitle.bind(this);
		this.renderEventChart = this.renderEventChart.bind(this);
		this.chartCanvasRef = React.createRef();
	}

	handleTeamChange = (e, data) => {
		this.setState({ bettingTeam: data });
	};

	handleChartChange = (e, data) => {
		this.setState({
			spreadProviders: this.state.eventsData.line_periods[data.value],
			spread: this.state.eventsData.line_periods[data.value][this.state.spreadType].moneyline
		});
	};
	handleSpreadChange = (e, data) => {
		this.setState({ spread: this.state.spreadProviders[data.value].moneyline, spreadType: data.value });
	};

	async componentDidMount() {
		const { sportsData } = this.context;

		let filterSports = sportsData.filter(data => data.sport_id === parseInt(this.props.sportId));

		let eventsData = filterSports[0].data.events.filter(event => event.event_id === this.props.eventId);
		let eventSport = filterSports[0].sport_name;

		let bettingIndexes = Object.keys(eventsData[0].line_periods);
		let firstBettingIndex = bettingIndexes[0];

		let defSpreadHelper = eventsData[0].line_periods[firstBettingIndex].period_full_game.spread;
		let spread;
		let spreadTeam = (spread = eventsData[0].teams_normalized[0].is_away
			? eventsData[0].teams_normalized[0].abbreviation
			: eventsData[0].teams_normalized[1].abbreviation);

		if (defSpreadHelper.point_spread_away < defSpreadHelper.point_spread_home) {
			spread = spreadTeam + " " + defSpreadHelper.point_spread_away;
		} else {
			spread = spreadTeam + " " + defSpreadHelper.point_spread_home;
		}

		let homeData = eventsData[0].teams_normalized
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
		let awayData = eventsData[0].teams_normalized
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

		let gameDetails = {
			title: `${eventsData[0].teams_normalized[0].abbreviation} - ${eventsData[0].teams_normalized[1].abbreviation}`,
			venueLocation: eventsData[0].score.venue_location,
			venueName: eventsData[0].score.venue_name,
			gameTime: eventsData[0].score.event_status_detail,
			teams: {
				home: homeData[0],
				away: awayData[0]
			}
		};

		let homeTeamName = `${homeData[0].teamName} ${homeData[0].teamMascot}`;
		let awayTeamName = `${awayData[0].teamName} ${awayData[0].teamMascot}`;
		let teamColors;
		if (eventSport === "MLS") {
			teamColors = TeamColors(eventSport, homeTeamName.split(" ").join(""), awayTeamName.split(" ").join(""));
		} else {
			teamColors = TeamColors(eventSport, homeData[0].teamMascot, awayData[0].teamMascot);
		}

		let selectBettingTeam = [
			{ key: homeTeamName, value: homeTeamName, text: homeTeamName },
			{ key: awayTeamName, value: awayTeamName, text: awayTeamName }
		];

		let homeStadium = `${homeData[0].teamName} ${homeData[0].teamMascot} Stadium`;
		let stadiumImage;
		let loadingImage;

		try {
			await axios
				.get(
					`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_CUSTOM_SEARCH_API}&cx=${process.env.CSE_ID}&q=${homeStadium}&searchType=image&fileType=jpg&imgSize=xlarge&alt=json`
				)
				.then(function(response) {
					stadiumImage = response.data.items[0].link;
					loadingImage = true;
					console.log("Sending a request");
				});
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({
			eventsData: eventsData[0],
			eventSport,
			eventSpread: spread,
			gameDetails,
			homeData: homeData[0],
			awayData: awayData[0],
			teamColors,
			selectBettingTeam,
			stadiumImage,
			loading: loadingImage
		});

		let spreadMoneylineFullGame = eventsData[0].line_periods[firstBettingIndex].period_full_game.moneyline;
		let providerDropdownOptions = Object.keys(eventsData[0].line_periods).map(index => {
			return {
				key: index,
				value: index,
				text: eventsData[0].line_periods[index].period_first_half.affiliate.affiliate_name
			};
		});

		this.setState({
			spread: spreadMoneylineFullGame,
			spreadProviders: eventsData[0].line_periods[firstBettingIndex],
			providerDropdownOptions
		});
	}

	onSubmit = async event => {
		event.preventDefault();
		this.setState({ loading: true, errorMessage: "" });

		try {
			await axios
				.post("http://localhost:3001/transaction/open/broadcast", {
					amount: this.state.betAmount,
					sender: this.state.betSender,
					recipient: this.state.betRecipient,
					sport: this.state.eventSport,
					event_id: this.state.eventsData.event_id,
					event_spread: this.state.eventSpread,
					gameDetails: this.state.gameDetails
				})
				.then(function(response) {
					console.log(response);
				});

			Router.push("/");
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	eventCardTitle() {
		const { eventsData, homeData, awayData } = this.state;

		//console.log(eventsData);

		let items = [
			{
				description: (
					<div>
						<h3>{`${awayData.teamAbbreviation} @ ${homeData.teamAbbreviation}`}</h3>
					</div>
				),
				fluid: true
			}
		];

		return <Card.Group items={items} />;
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

	renderEventCard() {
		const {
			eventsData,
			homeData,
			awayData,
			providerDropdownOptions,
			selectSpreadType,
			selectBettingTeam,
			stadiumImage
		} = this.state;

		return (
			<Card fluid>
				<div>
					<h3>{`${awayData.teamAbbreviation} @ ${homeData.teamAbbreviation}`}</h3>
				</div>

				<Image style={{ padding: "0em" }} src={stadiumImage} wrapped ui={true} />

				{this.eventCardTitle()}

				<Card.Content>
					<br />
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
						<Form.Field className="inline fields">
							<div className="field">
								<label>Your Team: </label>
							</div>
							<div className="field">
								<Dropdown
									placeholder="Team you're betting to win"
									fluid
									selection
									options={selectBettingTeam}
									onChange={this.handleTeamChange}
								/>
							</div>
							<div className="field">
								<label>Spread Type: </label>
							</div>
							<div className="field">
								<Dropdown
									defaultValue={selectSpreadType[0].value}
									fluid
									selection
									options={selectSpreadType}
									onChange={this.handleSpreadChange}
								/>
							</div>
							<div className="field">
								<label>Bet Amount: </label>
								<Input
									className="field"
									labelPosition="right"
									label="$ USD"
									value={this.state.betAmount}
									onChange={event => this.setState({ betAmount: event.target.value })}
								/>

								<Button className="ui blue button" loading={this.state.loading} primary>
									Create
								</Button>
							</div>
						</Form.Field>
						<Message error header="Oops!" content={this.state.errorMessage} />
					</Form>
				</Card.Content>

				<Card.Content>
					<Card.Meta>
						<span>Betting Provider</span>

						<Dropdown
							defaultValue="1"
							fluid
							selection
							options={providerDropdownOptions}
							onChange={this.handleChartChange}
						/>
					</Card.Meta>
					<Card.Description>{this.renderEventChart()}</Card.Description>
				</Card.Content>
			</Card>
		);
	}

	render() {
		const { loading } = this.state;
		let result;

		if (loading) {
			result = <div>{this.renderEventCard()}</div>;
		} else {
			result = (
				<div>
					<h3>Loading...</h3>
				</div>
			);
		}

		return <Layout>{result}</Layout>;
	}
}

export default BetNew;
