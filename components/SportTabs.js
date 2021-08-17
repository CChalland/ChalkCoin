import React, { useState } from "react";
import { Tabs, Tab, Image } from "react-bootstrap";
import SportCard from "./SportCard";

function SportTabs(props) {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);


	let gamePanes = props.allSportsData.map((game) => {
		let img = (
			<div key={game.sport_name.toString()}>
				<Image className="ui avatar image" width={28} height={28} src="" />
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

export default SportTabs;
