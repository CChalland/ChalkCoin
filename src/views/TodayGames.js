import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import SportTabs from "../components/SportTabs";

function TodayGames(props) {
	const { sportsData } = useContext(SportContext);

	console.log("IN TodayGame Page RENDER: ", sportsData);

	return (
		<>
			<SportTabs allSportsData={sportsData} />
		</>
	);
}

export default TodayGames;
