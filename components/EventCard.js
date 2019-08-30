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
  }

  async componentDidMount() {}

  googleImageData() {
    const { gameDetails, homeData } = this.props;
    let response;
    let stadium = gameDetails.venueName + " " + gameDetails.venueLocation;
    let searchValue = stadium
      ? stadium
      : homeData.teamName + " " + homeData.teamMascot + " Stadium";

    console.log("search value, ", searchValue);

    const client = new GoogleImages(
      process.env.CSE_ID,
      process.env.GOOGLE_CUSTOM_SEARCH_API
    );

    try {
      response = client.search(searchValue, { size: "xxlarge" }).then(result => {
        console.log(result[0]);
        return result;
      });
    } catch (e) {
      console.log(e);
    }

    return response;
  }

  CardExampleImageCard() {
    return (
      <Card>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>Daniel</Card.Header>
          <Card.Meta>Joined in 2016</Card.Meta>
          <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            10 Friends
          </a>
        </Card.Content>
      </Card>
    );
  }

  render() {
    //console.log("EventCard render: searchResult ", this.googleImageData());
    return (
      <div>
        <h3>Event Details...</h3>
        {this.CardExampleImageCard()}
      </div>
    );
  }
}

export default EventCard;
