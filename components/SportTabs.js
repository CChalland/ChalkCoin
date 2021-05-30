import React, { Component } from "react";
import { Tabs, Tab, Image } from "react-bootstrap";
import SportCard from "./SportCard";

class SportTabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0,
		};

		this.renderGamesTab = this.renderGamesTab.bind(this);
	}

	handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

	renderGamesTab() {
		const { activeIndex } = this.state;

		let gamePanes = this.props.allSportsData.map((game) => {
			let img = (
				<div key={game.sport_name.toString()}>
					<Image className="ui avatar image" src={`../static/media/${game.sport_id}.png`} />
					{game.sport_name}
				</div>
			);

			return (
				<Tab key={game.sport_id} eventKey={game.sport_name} title={img}>
					<SportCard
						key={game.sport_id}
						sportData={game}
						sportName={game.sport_name}
						sportIndex={activeIndex}
					/>
				</Tab>
			);
		});

		return (
			<Tabs defaultActiveKey="NFL" id="uncontrolled-tab-example">
				{gamePanes}
			</Tabs>
		);
	}

	render() {
		return this.renderGamesTab();
	}
}

export default SportTabs;
