import React, { Component } from "react";
const GoogleImages = require("google-images");

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: {},
      stadiumImages: []
    };
    this.googleImageRender = this.googleImageRender.bind(this);
  }

  async componentDidMount() {}

  googleImageRender() {
    const { gameDetails, homeData } = this.props;
    let result;
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
      client.search(searchValue, { size: "xxlarge" }).then(
        function(response) {
          result = response;
        }.bind(this)
      );
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log("EventCard render: searchResult ", this.state.stadiumImages);
    return (
      <div>
        <h3>Event Details...</h3>
        {this.googleImageRender()}
      </div>
    );
  }
}

export default EventCard;
