import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../routes";

class SportCard extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, daysIndex: 0 };
  }

  renderGamesCards(sportId) {
    let index = 0;
    let daysIndex = 0;
    let daysTimeTitle = (
      <div>
        <h3>{null}</h3>
      </div>
    );

    let gameItems = this.props.sportData[sportId].data.events.map(game => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let gameTime = new Date(game.event_date).toLocaleString("en-US", {
        timeZone: timeZone
      });

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

      let eventTime = this.props.gamesEventTime;

      if (game.event_date === eventTime[daysIndex]) {
        daysTimeTitle = (
          <div>
            <h3>game.event_date</h3>
          </div>
        );

        console.log(game.event_date);

        daysIndex++;
      } else {
        daysTimeTitle = null;
      }

      return {
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

    if (index === this.props.sportData[sportId].data.events.length - 1) {
      index = 0;
    } else if (daysIndex === this.props.gamesEventTime - 1) {
      daysIndex = 0;
    } else {
      index++;
    }

    return (
      <div>
        {daysTimeTitle}
        <Card.Group items={gameItems} />;
      </div>
    );
  }

  render() {
    return <div>{this.renderGamesCards(this.props.sportIndex)}</div>;
  }
}

export default SportCard;
