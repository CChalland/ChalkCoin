import React, { Component } from "react";
const GoogleImages = require("google-images");

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = { gameDetails: {} };
    this.googleImageRender = this.googleImageRender.bind(this);
  }

  componentDidMount() {}

  googleImageRender() {
    const { gameDetails } = this.props;
    let searchValue = gameDetails.venueName + " " + gameDetails.venueLocation;
    console.log("game details, ", gameDetails);
    console.log("search value, ", searchValue);
    const client = new GoogleImages(
      process.env.CSE_ID,
      process.env.GOOGLE_CUSTOM_SEARCH_API
    );

    console.log(client.search(searchValue, { size: "xxlarge" }));
  }

  render() {
    //console.log("EventCard render: eventData ", this.props.eventData);
    //console.log("EventCard render: gameDetails ", this.props.gameDetails);
    return (
      <div>
        <h3>Event Details...</h3>
        {this.googleImageRender()}
      </div>
    );
  }
}

export default EventCard;
