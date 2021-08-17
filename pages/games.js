import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import SportCard from "../components/SportCard";

function Games(props) {
	const { sportsData } = useContext(SportContext);
	let sportData = sportsData.filter((sport) => {
		return sport.abbrv === props.sport.toUpperCase();
	});

	return (
		<Container fluid>
			<h1>{sportData[0].display_name}</h1>
			<SportCard key={sportData[0].id} sportData={sportData[0]} sportName={sportData[0].display_name} />
		</Container>
	);
}

Games.getInitialProps = async ({ query }) => {
	return query;
};

export default Games;
