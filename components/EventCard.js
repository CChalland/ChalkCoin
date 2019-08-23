import React, { Component } from "react";

class EventCard extends Component {
  render() {
    console.log("EventCard render: ", this.props);
    return (
      <div>
        <h3>Event Details...</h3>
      </div>
    );
  }
}

export default EventCard;
