import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import GameCard from "./GameCard";

class GameTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this.renderGamesTab = this.renderGamesTab.bind(this);
  }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value });
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  renderGamesTab() {
    const { activeIndex } = this.state;

    let gamePanes = this.props.sportsData.map(game => {
      return {
        menuItem: game.sport_name,
        render: () => (
          <Tab.Pane attached={false}>
            <GameCard
              sportsData={this.props.sportsData}
              sportName={game.sport_name}
              sportIndex={activeIndex}
            />
          </Tab.Pane>
        )
      };
    });

    return (
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={gamePanes}
        activeIndex={activeIndex}
        onTabChange={this.handleTabChange}
      />
    );
  }

  render() {
    return <div>{this.renderGamesTab()}</div>;
  }
}

export default GameTabs;
