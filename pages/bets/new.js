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
      eventSport: "",
      gameDetails: {},
      eventSpread: 0
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const { sportsData } = this.context;
    let eventsData = sportsData[this.props.sportId - 1].data.events.filter(
      event => event.event_id === this.props.eventId
    );
    let eventSport = sportsData[this.props.sportId - 1].sport_name;
    this.setState({ eventsData: eventsData[0], eventSport });


    let defSpreadHelper =
      eventsData[0].sport_id !== 10
        ? eventsData[0].line_periods["1"].period_full_game.spread
        : eventsData[0].line_periods["2"].period_full_game.spread;
    let spread;
    let spreadTeam = (spread = eventsData[0].teams_normalized[0].is_away
      ? eventsData[0].teams_normalized[0].abbreviation
      : eventsData[0].teams_normalized[1].abbreviation);

    if (defSpreadHelper.point_spread_away < defSpreadHelper.point_spread_home) {
      spread = spreadTeam + " " + defSpreadHelper.point_spread_away;
    } else {
      spread = spreadTeam + " " + defSpreadHelper.point_spread_home;
    }
    this.setState({eventSpread: spread})

    let gameDetails = {
      title: `${eventsData[0].teams_normalized[0].abbreviation} - ${
        eventsData[0].teams_normalized[1].abbreviation
      }`,
      venueLocation: eventsData[0].score.venue_location,
      venueName: eventsData[0].score.venue_name,
      gameTime: eventsData[0].score.event_status_detail,
      teams: {
        home: eventsData[0].teams_normalized
          .filter(team => {
            return team.is_home;
          })
          .map(team => {
            return {
              teamName: team.name,
              teamMascot: team.mascot,
              teamAbbreviation: team.abbreviation
            };
          }),
        away: eventsData[0].teams_normalized
          .filter(team => {
            return team.is_away;
          })
          .map(team => {
            return {
              teamName: team.name,
              teamMascot: team.mascot,
              teamAbbreviation: team.abbreviation
            };
          })
      }
    };

    this.setState({gameDetails})
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    
    

    try {
      await axios
        .post("http://localhost:3001/transaction/open/broadcast", {
          amount: this.state.betAmount,
          sender: this.state.betSender,
          recipient: this.state.betRecipient,
          sport: this.state.eventSport,
          event_id: this.state.eventsData.event_id,
          event_spread: this.state.eventSpread,
          gameDetails: this.state.gameDetails
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

    return (
      <Layout>
        <h3>Create a Bet</h3>

        <EventCard
          eventsData={this.state.eventsData}
          gameDetails={this.state.gameDetails}
        />

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
