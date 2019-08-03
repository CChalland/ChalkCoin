import React, { Component } from "react";
import axios from "axios";
const unirest = require("unirest");

class BetokenIndex extends Component {
  static async getInitialProps() {
    const getNode1 = `http://localhost:3001/blockchain`;
    let response = await axios.get(getNode1);
    const blockchain = response.data;
    console.log(blockchain);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);

    let req = unirest(
      "GET",
      `https://therundown-therundown-v1.p.rapidapi.com/sports/3/events/${today}`
    );

    req.query({
      include: ["all_periods", "scores"],
      offset: "0"
    });

    req.headers({
      "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
      "x-rapidapi-key": "f010e18ceamsh44a01771378c10ep13cad0jsna22095d205e7"
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });

    return { blockchain };
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
