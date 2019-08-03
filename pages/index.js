import React, { Component } from "react";
import axios from "axios";

class BetokenIndex extends Component {
  static async getInitialProps() {
    const getNode1 = `http://localhost:3001/blockchain`;
    let response = await axios.get(getNode1);
    const blockchain = response.data;

    console.log(blockchain);

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

  render() {
    return (
      <div>
        Betoken Index! {this.props.blockchain.pendingTransactions[0].amount}
      </div>
    );
  }
}

export default BetokenIndex;
