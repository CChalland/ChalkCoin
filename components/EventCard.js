import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
const GoogleImages = require("google-images");

class EventCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameDetails: {},
			stadiumImages: []
		};
		this.googleImageData = this.googleImageData.bind(this);
		this.renderEventCard = this.renderEventCard.bind(this);
		this.eventCardTitle = this.eventCardTitle.bind(this);
	}

	async componentDidMount() {}

	async googleImageData() {
		const { gameDetails, homeData } = this.props;
		let stadium = gameDetails.venueName + " " + gameDetails.venueLocation;
		let searchValue = stadium
			? stadium
			: homeData.teamName + " " + homeData.teamMascot + " Stadium";

		console.log("search value, ", searchValue);

		const client = new GoogleImages(
			process.env.CSE_ID,
			process.env.GOOGLE_CUSTOM_SEARCH_API
		);

		let response = await client.search(searchValue, { size: "xxlarge" }).then(result => {
			//console.log(result[0]);
			return result;
		});

		return response;
	}

	eventCardTitle() {
		const { eventData, homeData, awayData } = this.props;
		console.log(eventData);
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		let gameTime = new Date(eventData.event_date).toLocaleString("en-US", {
			timeZone: timeZone
		});

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

	renderEventCard() {
		const { gameDetails, homeData, awayData, eventData } = this.props;

		return (
			<Card fluid>
				<div>
					<h3>{`${awayData.teamAbbreviation} @ ${homeData.teamAbbreviation}`}</h3>
				</div>
				<Image
					style={{ padding: "0em" }}
					src={`../static/media/${eventData.sport_id}-${homeData.teamAbbreviation}-stadium.png`}
					wrapped
					ui={true}
				/>
				{this.eventCardTitle()}
				<Card.Content>
					<Card.Meta>
						<span className="date">Joined in 2015</span>
					</Card.Meta>
					<Card.Description>Matthew is a musician living in Nashville.</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<a>
						<Icon name="user" />
						22 Friends
					</a>
				</Card.Content>
			</Card>
		);
	}

	render() {
		//console.log("EventCard render: searchResult ", this.googleImageData());
		return <div>{this.renderEventCard()}</div>;
	}
}

export default EventCard;
