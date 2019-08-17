import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import GameCard from "./GameCard";

class GameTabs extends Component {
  renderGamesTab() {
    let gamePanes = this.props.sportsData.map(game => {
      return {
        menuItem: game.sport_name,
        render: () => (
          <Tab.Pane attached={false}>
            <GameCard gameId={game.id} sportsData={this.props.sportsData} />
          </Tab.Pane>
        )
      };
    });

    return <Tab menu={{ secondary: true, pointing: true }} panes={gamePanes} />;
  }

  render() {
    return (
      <div>
        <GameCard sportsData={this.props.sportsData} />
      </div>
    );
  }
}

export default GameTabs;
