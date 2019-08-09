import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container } from "semantic-ui-react";
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
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/1/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let ncaafByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let nflByDate = response.data;

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
    let mlbByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/4/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let nbaByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/5/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let ncaabByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/6/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let nhlByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/7/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let ufcByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/8/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let wnbaByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/9/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let cflByDate = response.data;

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/10/events/${today}`,
      headers: {
        "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.THERUNDOWN_API_KEY
      },
      params: {
        include: ["all_periods", "scores"],
        offset: "0"
      }
    });
    let mlsByDate = response.data;

    console.log(mlbByDate);

    return {
      sportId,
      blockchain,
      ncaafByDate,
      nflByDate,
      mlbByDate,
      nbaByDate,
      ncaabByDate,
      nhlByDate,
      ufcByDate,
      wnbaByDate,
      cflByDate,
      mlsByDate
    };
  }

  renderMLBTodayGames() {
    let gameItems = this.props.mlbByDate.events.map(game => {
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
              {this.props.sportId[game.sport_id - 1]}
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
          <h3>Today's Games</h3>
          {this.renderMLBTodayGames()}
          <h3>Open Bets</h3>
          {this.renderCurrentBets()}
          <Button content="Create Bet" icon="add circle" primary />
        </div>
      </Layout>
    );
  }
}

export default BetokenIndex;
