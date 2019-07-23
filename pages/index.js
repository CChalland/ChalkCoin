import React, { Component } from "react";
import axios from "axios";

class BetokenIndex extends Component {
  static async getInitialProps() {
    const getNode1 = `http://localhost:3001/blockchain`;
    const response = await axios.get(getNode1);
    const blockchain = response.data;
    console.log(blockchain);

    return { blockchain };
  }

  render() {
    return <div>Betoken Index!</div>;
  }
}

export default BetokenIndex;
