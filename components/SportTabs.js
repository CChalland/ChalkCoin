import React, { Component } from "react";
import { Tab, Menu } from "semantic-ui-react";

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

			return {
				menuItem: <Menu.Item key={game.sport_id}>{img}</Menu.Item>,
				render: () => <Tab.Pane attached={false} raised></Tab.Pane>,
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
