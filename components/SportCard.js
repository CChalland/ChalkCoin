import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../routes";

class SportCard extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, daysIndex: 0, timeTitle: "" };
  }

  renderGamesCards(sportId) {
    let gameItems = this.props.sportData[sportId].data.events.map(game => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let gameTime = new Date(game.event_date).toLocaleString("en-US", {
        timeZone: timeZone
      });
      let eventDate = gameTime.split(",")[0];

      let defSpreadHelper =
        game.sport_id !== 10
          ? game.line_periods["1"].period_full_game.spread
          : game.line_periods["2"].period_full_game.spread;
      let spread;
      let spreadTeam = (spread = game.teams_normalized[0].is_away
        ? game.teams_normalized[0].abbreviation
        : game.teams_normalized[1].abbreviation);

      if (defSpreadHelper.point_spread_away < defSpreadHelper.point_spread_home) {
        spread = spreadTeam + " " + defSpreadHelper.point_spread_away;
      } else {
        spread = spreadTeam + " " + defSpreadHelper.point_spread_home;
      }

      return {
        date: eventDate,
        description: (
          <div>
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
                {gameTime}
                <br />
                {this.props.sportName}
                <br />
                {spread}
              </span>
              <Link
                href={{
                  pathname: "/bets/new",
                  query: { sportId: game.sport_id, eventId: game.event_id }
                }}
              >
                <a>
                  <Button
                    floated="right"
                    content="Create Bet"
                    icon="add circle"
                    primary
                  />
                </a>
              </Link>
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
            <Link route={`/games/${game.event_id}`}>
              <a>View Game Details</a>
            </Link>
          </div>
        ),
        fluid: true
      };
    });

    let splitArray = this.props.splitArray;
    //console.log(this.props.gamesEventTime);

    for (let splitIndex = 0; splitIndex < gameItems.length; splitIndex++) {
      if (splitIndex < this.props.diffDaysArray[1]) {
        splitArray[`${this.props.gamesEventTime[0]}`].push(gameItems[splitIndex]);
      } else if (splitIndex < this.props.diffDaysArray[2]) {
        splitArray[`${this.props.gamesEventTime[1]}`].push(gameItems[splitIndex]);
      } else if (splitIndex < this.props.diffDaysArray[3]) {
        splitArray[`${this.props.gamesEventTime[2]}`].push(gameItems[splitIndex]);
      } else if (splitIndex > this.props.diffDaysArray[3]) {
        splitArray[`${this.props.gamesEventTime[3]}`].push(gameItems[splitIndex]);
      }
    }

    let returnResult = this.props.gamesEventTime.map(time => {
      return (
        <div>
          <h3>{time}</h3>
          <Card.Group items={splitArray[`${time}`]} />
        </div>
      );
    });

    console.log(gameItems);
    //console.log(splitArray);

    return (
      <div>
        <Card.Group items={gameItems} />
      </div>
    );
  }

  render() {
    return <div>{this.renderGamesCards(this.props.sportIndex)}</div>;
  }
}

export default SportCard;
