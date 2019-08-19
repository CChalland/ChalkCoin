import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../routes";

class GameCard extends Component {
  renderGamesCards(sportId) {
    let gameItems = this.props.sportsData[sportId].data.events.map(game => {
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
              <span style={{ position: "absolute", right: "100px" }}>
                {game.score.event_status_detail}
                <br />
                {this.props.sportsData[game.sport_id - 1].sport_name}
                <br />
                Away Team's Spread{" "}
                {game.line_periods["1"].period_full_game.spread.point_spread_away}
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
    return <div>{this.renderGamesCards(2)}</div>;
  }
}

export default GameCard;
