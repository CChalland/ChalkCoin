import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

class BetokenIndex extends Component {
  static async getInitialProps() {
    const sportId = [
      "NCAA Football",
      "NFL",
      "MLB",
      "NBA",
      "NCAA Men's Basketball",
      "NHL",
      "UFC/MMA",
      "WNBA",
      "CFL",
      "MLS"
    ];
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

    return { sportId, blockchain, sportsByDate };
  }

  renderTodayGames() {
    let gameItems = this.props.sportsByDate.events.map(game => {
      return {
        header: (
          <h3>
            <img
              class="ui avatar image"
              src={`../static/media/${game.sport_id}.png`}
            />
            {this.props.sportId[game.sport_id - 1]}
          </h3>
        ),
        description: (
          <h4>
            <img
              class="ui avatar image"
              src={`../static/media/${game.sport_id}-${
                game.teams_normalized[0].abbreviation
              }.png`}
            />
            {game.teams_normalized[0].mascot}
            <span style={{ position: "absolute", right: "400px" }}>
              {game.teams_normalized[0].record}
            </span>
            <br />
            <br />
            <span
              style={{
                width: "1px",
                background: "rgba(34,36,38,.15)",
                position: "absolute",
                top: "0",
                bottom: "0",
                right: "350px"
              }}
            />
            >
            <img
              class="ui avatar image"
              src={`../static/media/${game.sport_id}-${
                game.teams_normalized[1].abbreviation
              }.png`}
            />
            {game.teams_normalized[1].mascot}
            <span style={{ position: "absolute", right: "400px" }}>
              {game.teams_normalized[1].record}
            </span>
          </h4>
        ),
        fluid: true
      };
    });

    return <Card.Group items={gameItems} />;
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
        <div>
          <h3>Today's Games</h3>
          {this.renderTodayGames()}
          <h3>Open Bets</h3>
          {this.renderCurrentBets()}
          <Button content="Create Bet" icon="add circle" primary />
        </div>
      </Layout>
    );
  }
}

export default BetokenIndex;
