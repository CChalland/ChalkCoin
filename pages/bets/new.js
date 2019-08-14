import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";

class BetNew extends Component {
  render() {
    return (
      <Layout>
        <h3>Create a Bet</h3>

        <Form>
          <Form.Field>
            <label>Bet Amount</label>
            <input />
          </Form.Field>

          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default BetNew;
