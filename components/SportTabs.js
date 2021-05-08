import React, { Component } from "react";
import { Tabs } from "react-bootstrap";
// import SportCard from "./SportCard";

class SportTabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0,
		};

		this.renderGamesTab = this.renderGamesTab.bind(this);
	}

	handleRangeChange = (e) => this.setState({ activeIndex: e.target.value });
	handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

	renderGamesTab() {
		const { activeIndex } = this.state;

		let gamePanes = this.props.allSportsData.map((game) => {
			let img = (
				<div>
					<img className="ui avatar image" src={`../static/media/${game.sport_id}.png`} />
					{game.sport_name}
				</div>
			);

			return {};
		});

		return (
			// <Tab
			// 	menu={{ secondary: true, pointing: true }}
			// 	panes={gamePanes}
			// 	activeIndex={activeIndex}
			// 	onTabChange={this.handleTabChange}
			// />
			<div></div>
		);
	}

	render() {
		return <div>{this.renderGamesTab()}</div>;
	}
}

export default SportTabs;
