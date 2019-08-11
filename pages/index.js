import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Tab } from "semantic-ui-react";
import Layout from "../components/Layout";
let qs = require("qs");

class BetokenIndex extends Component {
  static async getInitialProps() {
    let activeIndex = 0;
    let sportsData = [
      { sport_id: 1, sport_name: "NCAA Football", data: {} },
      { sport_id: 2, sport_name: "NFL", data: {} },
      { sport_id: 3, sport_name: "MLB", data: {} },
      { sport_id: 4, sport_name: "NBA", data: {} },
      { sport_id: 5, sport_name: "NCAA Men's Basketball", data: {} },
      { sport_id: 6, sport_name: "NHL", data: {} },
      { sport_id: 7, sport_name: "UFC/MMA", data: {} },
      { sport_id: 8, sport_name: "WNBA", data: {} },
      { sport_id: 9, sport_name: "CFL", data: {} },
      { sport_id: 10, sport_name: "MLS", data: {} }
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
        sportsData[0].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/2/events`,
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
        sportsData[1].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/3/events`,
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
        sportsData[2].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/4/events`,
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
        sportsData[3].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/5/events`,
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
        sportsData[4].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/6/events`,
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
        sportsData[5].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/7/events`,
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
        sportsData[6].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/8/events`,
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
        sportsData[7].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/9/events`,
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
        sportsData[8].data = response.data;
      }.bind(this)
    );

    response = await axios({
      method: "GET",
      url: `https://therundown-therundown-v1.p.rapidapi.com/sports/10/events`,
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
        sportsData[9].data = response.data;
      }.bind(this)
    );

    console.log(sportsData[2].data);

    return { activeIndex, sportsData, blockchain };
  }

  renderGamesCards(sportId) {
    let gameItems = this.props.sportsData[sportId].data.events.map(game => {
      return {
        description: (
          <h4>
            <img
              className="ui avatar image"
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
              {this.props.sportsData[game.sport_id - 1].sport_name}
              <br />
              {"Game's spread right here"}
            </span>
            <br />
            <img
              className="ui avatar image"
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

  renderGamesTap() {
    let gamePanes = this.props.sportsData.map(game => {
      return {
        menuItem: game.sport_name,
        render: () => (
          <Tab.Pane attached={false}>{this.renderGamesCards(game.id)}</Tab.Pane>
        )
      };
    });

    return <Tab menu={{ secondary: true, pointing: true }} panes={gamePanes} />;
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
          <br />
          {this.renderGamesCards(2)}
          {/*this.renderGamesTap()*/}
          <h3>Open Bets</h3>
          {this.renderCurrentBets()}
          <Button content="Create Bet" icon="add circle" primary />
        </div>
      </Layout>
    );
  }
}

export default BetokenIndex;
