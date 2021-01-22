import React, { Component } from "react";
import { Card, Button, Tab, Accordion, Icon } from "semantic-ui-react";
import { Link } from "../routes";

class SportCard extends Component {
	constructor(props) {
		super(props);
		this.state = { index: 0, activeIndex: 0 };

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	renderGamesCards(sportId) {
		const { activeIndex } = this.state;

		let gameItems;
		console.log(this.props.sportData[sportId].data.events);
	}

	render() {
		return <div>{this.renderGamesCards(this.props.sportIndex)}</div>;
	}
}

export default SportCard;
