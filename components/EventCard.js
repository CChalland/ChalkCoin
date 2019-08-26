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
    //console.log(searchValue);
    const client = new GoogleImages(
      "014368647084617525560:qvb0ktdobd7",
      "AIzaSyB6uD0lnTzznNjOFlg-Tbt4ZYeA3jY1tXs"
    );

    console.log(client.search(searchValue, { size: "large" }));
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
