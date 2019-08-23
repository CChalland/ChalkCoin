import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";
import SportTabs from "../components/SportTabs";
import { SportContext } from "../contexts/SportContext";

class BetokenIndex extends Component {
  static contextType = SportContext;

  constructor(props) {
    super(props);
    this.state = {
      sportsData: [],
      blockchain: {},
      loadingData: false,
      fetchedSportData: false
    };

    this.renderCurrentBets = this.renderCurrentBets.bind(this);
  }

  renderCurrentBets(blockchain) {
    const betItems = blockchain.openTransactions.map(bet => {
      return {
        header: bet.amount,
        description: <a>View Bet</a>,
        fluid: true
      };
    });

    return <Card.Group items={betItems} />;
  }

  render() {
    //let { loadingData } = this.state;
    const { sportsData, blockchain, fetchedSportData } = this.context;

    let result;
    if (fetchedSportData) {
      result = (
        <div>
          <br />
          <SportTabs allSportsData={sportsData} />
          <h3>Open Bets</h3>
          <Button floated="right" content="Create Bet" icon="add circle" primary />
          {this.renderCurrentBets(blockchain)}
        </div>
      );
    } else {
      result = (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }

    return <Layout>{result}</Layout>;
  }
}

export default BetokenIndex;
