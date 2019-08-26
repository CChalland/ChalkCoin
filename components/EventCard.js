import React, { Component } from "react";

class EventCard extends Component {
  render() {
    console.log("EventCard render: eventsData ", this.props.eventsData);
    console.log("EventCard render: gameDetails ", this.props.gameDetails);
    return (
      <div>
        <h3>Event Details...</h3>
      </div>
    );
  }
}

export default EventCard;
