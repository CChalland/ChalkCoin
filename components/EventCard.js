import React, { Component } from "react";
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
        //console.log(result[0]);
        return result;
      });
    } catch (e) {
      console.log(e);
    }

    return response;
  }

  render() {
    console.log("EventCard render: searchResult ", this.googleImageData());
    return (
      <div>
        <h3>Event Details...</h3>
        {}
      </div>
    );
  }
}

export default EventCard;
