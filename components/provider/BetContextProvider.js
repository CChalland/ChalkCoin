import React, { Component } from 'react';
import BetContext from './BetContext';

class BetContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bet: {
        sender: "TestingSender",
        recipient: "TestingRecipient"
      }
    };
  }

  render() {
    let { gameDetails } = this.props;
    return (
      <BetContext.Provider gameDetails={gameDetails}>
        {this.props.children}
      </BetContext.Provider>
    )
  }
}

export default BetContextProvider;