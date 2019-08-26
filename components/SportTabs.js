import React, { Component } from "react";
import { Tab, Menu } from "semantic-ui-react";
import SportCard from "./SportCard";

class SportTabs extends Component {
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

    let gamePanes = this.props.allSportsData.map(game => {
      let diffDaysIndex = [];
      let gamesEventTime = [];

      for (let i = 0; i < game.data.events.length - 1; i++) {
        let day = game.data.events[i].event_date.slice(8, 10);
        let nextDay = game.data.events[i + 1].event_date.slice(8, 10);
        console.log(game.data.events[i].event_date, day, nextDay);
        if (day < nextDay) {
          diffDaysIndex.push(i);
          gamesEventTime.push(game.data.events[i].event_date);
        }
      }
      console.log(gamesEventTime);

      let img = (
        <div>
          <img className="ui avatar image" src={`../static/media/${game.sport_id}.png`} />
          {game.sport_name}
        </div>
      );

      return {
        menuItem: <Menu.Item key={game.sport_id}>{img}</Menu.Item>,
        render: () => (
          <Tab.Pane
            attached={false}
            color="black"
            raised
            style={{ overflow: "auto", maxHeight: "75em" }}
          >
            <SportCard
              sportData={this.props.allSportsData}
              sportName={game.sport_name}
              sportIndex={activeIndex}
              gamesEventTime={gamesEventTime}
              diffDaysIndex={diffDaysIndex}
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

export default SportTabs;
