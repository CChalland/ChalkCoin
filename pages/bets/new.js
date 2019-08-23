import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Router } from "../../routes";
import { SportContext } from "../../contexts/SportContext";

class BetNew extends Component {
  static contextType = SportContext;

  static async getInitialProps(query) {
    const sportId = query.query.sportId;
    const eventId = query.query.eventId;
    console.log("InitialProps: ", query.query.sportId);
    return { sportId, eventId };
  }

  constructor(props) {
    super(props);
    this.state = {
      betAmount: "",
      betSender: "",
      betRecipient: "",
      betSport: "",
      betEvent_id: "",
      betEvent_spread: 0,
      betDescription: "",
      errorMessage: "",
      loading: false,
      eventsData: {}
    };
  }

  componentDidMount() {
    const { sportsData } = this.context;
    let eventsData = sportsData[this.props.sportId - 1].data.events.filter(
      event => event.event_id === this.props.eventId
    );
    this.setState({ eventsData });
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      await axios
        .post("http://localhost:3001/transaction", {
          amount: this.state.betAmount,
          sender: this.state.betSender,
          recipient: this.state.betRecipient,
          sport: this.state.betSport,
          event_id: this.state.betEvent_id,
          event_spread: this.state.betEvent_spread,
          description: this.state.betDescription
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
    console.log("render: state ", this.state);
    return (
      <Layout>
        <h3>Create a Bet</h3>

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
