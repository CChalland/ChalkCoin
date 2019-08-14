import React, { Component } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";

class BetNew extends Component {
  state = {
    betAmount: "",
    errorMessage: "",
    loading: false
  };

  render() {
    return (
      <Layout>
        <h3>Create a Bet</h3>

        <Form>
          <Form.Field>
            <label>Bet Amount</label>
            <Input
              labelPosition="right"
              label="$ USD"
              value={this.state.betAmount}
              onChange={event =>
                this.setState({ betAmount: event.target.value })
              }
            />
          </Form.Field>

          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default BetNew;
