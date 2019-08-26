import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Router } from "../../routes";
import { SportContext } from "../../contexts/SportContext";
import EventCard from "../../components/EventCard";

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
      betSender: "",
      betRecipient: "",
      errorMessage: "",
      loading: false,
      eventsData: {},
      eventSport: ""
    };
  }

  componentDidMount() {
    const { sportsData } = this.context;
    let eventsData = sportsData[this.props.sportId - 1].data.events.filter(
      event => event.event_id === this.props.eventId
    );
    let eventSport = sportsData[this.props.sportId - 1].sport_name;
    this.setState({ eventsData, eventSport });
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const { eventsData } = this.state;
    const eventData = eventsData[0];

    let defSpreadHelper =
      eventData.sport_id !== 10
        ? eventData.line_periods["1"].period_full_game.spread
        : eventData.line_periods["2"].period_full_game.spread;
    let spread;
    let spreadTeam = (spread = eventData.teams_normalized[0].is_away
      ? eventData.teams_normalized[0].abbreviation
      : eventData.teams_normalized[1].abbreviation);

    if (defSpreadHelper.point_spread_away < defSpreadHelper.point_spread_home) {
      spread = spreadTeam + " " + defSpreadHelper.point_spread_away;
    } else {
      spread = spreadTeam + " " + defSpreadHelper.point_spread_home;
    }

    let gameDetails = {
      title: `${eventData.teams_normalized[0].abbreviation} - ${
        eventData.teams_normalized[1].abbreviation
      }`,
      venueLocation: eventData.score.venue_location,
      venueName: eventData.score.venue_name,
      gameTime: eventData.score.event_status_detail,
      teams: {home: eventData.teams_normalized.filter(team => {return team.is_home}).map(team => {
      return {
        teamName: team.name,
        teamMascot: team.mascot,
        teamAbbreviation: team.abbreviation
      };
    }), away: eventData.teams_normalized.filter(team => {return team.is_away}).map(team => {
      return {
        teamName: team.name,
        teamMascot: team.mascot,
        teamAbbreviation: team.abbreviation
      };
    })}
    };

    try {
      await axios
        .post("http://localhost:3001/transaction/open/broadcast", {
          amount: this.state.betAmount,
          sender: this.state.betSender,
          recipient: this.state.betRecipient,
          sport: this.state.eventSport,
          event_id: eventData.event_id,
          event_spread: spread,
          gameDetails: gameDetails
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

  render() {
    let gameDetails = this.state.eventsData[0];

    return (
      <Layout>
        <h3>Create a Bet</h3>

        <EventCard eventsData={gameDetails} />

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Bet Amount</label>
            <Input
              labelPosition="right"
              label="$ USD"
              value={this.state.betAmount}
              onChange={event => this.setState({ betAmount: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default BetNew;
