import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../routes";
import GameCardModal from "./GameCardModal";

class GameCard extends Component {
  renderGamesCards(sportId) {
    let gameItems = this.props.sportsData[sportId].data.events.map(game => {
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
                {game.score.event_status_detail}
                <br />
                {this.props.sportName}
                <br />
                {spread}
              </span>
              <Link route="/bets/new">
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

    return <Card.Group items={gameItems} />;
  }

  render() {
    return <div>{this.renderGamesCards(this.props.sportIndex)}</div>;
  }
}

export default GameCard;
