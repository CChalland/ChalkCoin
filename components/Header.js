import React from "react";
import { Dropdown, Icon, Menu, Segment } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <div>
      <Menu
        borderless
        fitted="true"
        inverted
        attached="top"
        color="black"
        style={{ marginTop: "10px" }}
      >
        <Link route="/">
          <a className="item">Betoken</a>
        </Link>
        <Link route="/">
          <a className="item">Today's Games</a>
        </Link>
        <Link route="/">
          <a className="item">Open Bets</a>
        </Link>

        <Menu.Menu position="right">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input
                className="prompt"
                type="text"
                placeholder="Search sport games..."
              />
              <i className="search link icon" />
            </div>
            <div className="results" />
          </div>
        </Menu.Menu>

        <Dropdown item icon="wrench" simple>
          <Dropdown.Menu style={{ left: "auto", right: 0 }}>
            <Dropdown.Header>"Current Username"</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Header>Balance</Dropdown.Header>
            <Link route="/">
              <a className="item">Current Bets</a>
            </Link>

            <Link route="/">
              <a className="item">Past Bets</a>
            </Link>

            <Dropdown.Divider />
            <Link route="/">
              <a className="item">Settings</a>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
};
