const qs = require("qs");
import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Tab } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";
import GameTabs from "../components/GameTabs";
import BetContextProvider from "../components/provider/BetContextProvider";

class BetokenIndex extends Component {
  static async getInitialProps() {
    let activeIndex = 0;
    let sportsData = [
      { sport_id: 1, sport_name: "NCAA Football", data: {} },
      { sport_id: 2, sport_name: "NFL", data: {} },
      { sport_id: 3, sport_name: "MLB", data: {} },
      /*{ sport_id: 4, sport_name: "NBA", data: {} },
      { sport_id: 5, sport_name: "NCAA Men's Basketball", data: {} },
      { sport_id: 6, sport_name: "NHL", data: {} },
      { sport_id: 7, sport_name: "UFC/MMA", data: {} },
      { sport_id: 8, sport_name: "WNBA", data: {} },
      { sport_id: 9, sport_name: "CFL", data: {} },*/
      { sport_id: 10, sport_name: "MLS", data: {} }
    ];
    const getNode1 = `http://localhost:3001/blockchain`;
    let response = await axios.get(getNode1);
    const blockchain = response.data;

    let today = new Date().toJSON().slice(0, 10);

    try {
      for (let i = 0; i < sportsData.length; i++) {
        response = await axios({
          method: "GET",
          url: `https://therundown-therundown-v1.p.rapidapi.com/sports/${
            sportsData[i].sport_id
          }/events`,
          headers: {
            "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.THERUNDOWN_API_KEY_1
          },
          params: {
            include: ["all_periods", "scores"]
          },
          paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          }
        }).then(
          function(response) {
            sportsData[i].data = response.data.events.sort(function(a, b) {
              return new Date(a.event_date) - new Date(b.event_date);
            });
            console.log(sportsData[i].data);
          }.bind(this)
        );
      }
    } catch (err) {
      console.log(err.message);
    }

    return { activeIndex, sportsData, blockchain };
  }

  renderCurrentBets() {
    const betItems = this.props.blockchain.pendingTransactions.map(bet => {
      return {
        header: bet.amount,
        description: <a>View Bet</a>,
        fluid: true
      };
    });

    return <Card.Group items={betItems} />;
  }

  render() {
    return (
      <Layout>
        <BetContextProvider gameDetails={this.props.sportsData} />
        <div>
          <br />
          <GameTabs sportsData={this.props.sportsData} />
          <h3>Open Bets</h3>
          <Button
            floated="right"
            content="Create Bet"
            icon="add circle"
            primary
          />
          {this.renderCurrentBets()}
        </div>
      </Layout>
    );
  }
}

export default BetokenIndex;
