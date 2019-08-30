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

	renderEventCard() {
		const { gameDetails, homeData, awayData, eventData } = this.props;

		console.log("game, ", gameDetails);
		console.log("home, ", eventData);

		return (
			<Card fluid>
				<Card
					fluid
					header={`${awayData.teamAbbreviation} @ ${homeData.teamAbbreviation}`}
				/>
				<Image
					style={{ padding: "-10em" }}
					src={`../static/media/${eventData.sport_id}-${homeData.teamAbbreviation}-stadium.png`}
					wrapped
					ui={true}
				/>
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
