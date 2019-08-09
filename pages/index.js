import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container } from "semantic-ui-react";
import Layout from "../components/Layout";

class BetokenIndex extends Component {
  static async getInitialProps() {
    const sportId = [
      { sport_id: 1, sport_name: "NCAA Football" },
      { sport_id: 2, sport_name: "NFL" },
      { sport_id: 3, sport_name: "MLB" },
      { sport_id: 4, sport_name: "NBA" },
      { sport_id: 5, sport_name: "NCAA Men's Basketball" },
      { sport_id: 6, sport_name: "NHL" },
      { sport_id: 7, sport_name: "UFC/MMA" },
      { sport_id: 8, sport_name: "WNBA" },
      { sport_id: 9, sport_name: "CFL" },
      { sport_id: 10, sport_name: "MLS" }
    ];
    const getNode1 = `http://localhost:3001/blockchain`;
    let response = await axios.get(getNode1);
    const blockchain = response.data;

    let today = new Date().toJSON().slice(0, 10);
    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/1/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let ncaafData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/2/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let nflData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/3/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let mlbData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/4/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let nbaData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/5/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let ncaabData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/6/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let nhlData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/7/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let ufcData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/8/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let wnbaData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/9/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let cflData = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/10/events`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let mlsData = response.data;

    console.log(mlbData);

    return {
      sportId,
      blockchain,
      ncaafData,
      nflData,
      mlbData,
      nbaData,
      ncaabData,
      nhlData,
      ufcData,
      wnbaData,
      cflData,
      mlsData
    };
  }

  renderMLBGames() {
    let gameItems = this.props.mlbData.events.map(game => {
      return {
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
            <span style={{ position: "absolute", right: "150px" }}>
              {game.event_date}
              <br />
              {this.props.sportId[game.sport_id - 1].sport_name}
              <br />
              {"Game's spread right here"}
            </span>
            <br />
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
          <h3>MLB's Games</h3>
          {this.renderMLBGames()}
          <h3>Open Bets</h3>
          {this.renderCurrentBets()}
          <Button content="Create Bet" icon="add circle" primary />
        </div>
      </Layout>
    );
  }
}

export default BetokenIndex;
