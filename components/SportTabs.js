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

  componentDidMount() {
    let gameSperated = this.props.allSportsData.map(game => {
      let indexMount = 0;
      let diffDaysIndex = [];
      let gamesData = {};

      for (let i = 0; i < game.data.events.length - 1; i++) {
        let day = game.data.events[i].event_date.slice(8, 10);
        let nextDay = game.data.events[i + 1].event_date.slice(8, 10);
        console.log(game.data.events[i].event_date, day, nextDay);
        if (day < nextDay) {
          diffDaysIndex.push(i);
          gamesData[i] = game.data.events[i];
        } else if (day === nextDay) {
          console.log(gamesData[i]);
        }
      }
    });
  }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value });
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  renderGamesTab() {
    const { activeIndex } = this.state;

    let gamePanes = this.props.allSportsData.map(game => {
      let index = 0;
      let diffDaysIndex = [];

      for (let i = 0; i < game.data.events.length - 1; i++) {
        let day = game.data.events[i].event_date.slice(8, 10);
        let nextDay = game.data.events[i + 1].event_date.slice(8, 10);
        console.log(game.data.events[i].event_date, day, nextDay);
        if (day < nextDay) {
          diffDaysIndex.push(i);
        }
      }

      //console.log(diffDaysIndex);

      let img = (
        <div>
          <img className="ui avatar image" src={`../static/media/${game.sport_id}.png`} />
          {game.sport_name}
        </div>
      );

      index++;

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
