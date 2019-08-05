import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

class BetokenIndex extends Component {
  static async getInitialProps() {
    const getNode1 = `http://localhost:3001/blockchain`;
    let response = await axios.get(getNode1);
    const blockchain = response.data;

    let today = new Date().toJSON().slice(0, 10);
    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/3/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let sportsByDate = response.data;
    console.log(sportsByDate);

    return { blockchain, sportsByDate };
  }

  renderCurrentBets() {
    const items = this.props.blockchain.pendingTransactions.map(bet => {
      return {
        header: bet.amount,
        description: <a>View Bet</a>,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <h3>Open Bets</h3>
          {this.renderCurrentBets()}
          <Button content="Create Bet" icon="add circle" primary />
        </div>
      </Layout>
    );
  }
}

export default BetokenIndex;
