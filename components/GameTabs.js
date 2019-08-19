import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import GameCard from "./GameCard";

class GameTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1
    }

    this.renderGamesTab = this.renderGamesTab.bind(this);
  }

  renderGamesTab() {
    let gamePanes = this.props.sportsData.map(game => {
      return {
        menuItem: game.sport_name,
        render: () => (
          <Tab.Pane attached={false} name={game.sport_name} key={game.sport_id} active={this.state.activeTab === game.sport_id}>
            <GameCard gameId={game.id} sportsData={this.props.sportsData} />
          </Tab.Pane>
        )
      };
    });
    console.log(this.state.activeTab)

    return <Tab menu={{ secondary: true, pointing: true }} panes={gamePanes} />;
  }

  render() {
    return <div>{this.renderGamesTab()}</div>;
  }
}

export default GameTabs;
