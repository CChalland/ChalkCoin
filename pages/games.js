import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import SportCard from "../components/SportCard";
import prisma from "../contexts/prisma";

function Games(props) {
	const { sportsData } = useContext(SportContext);
	let sportData = sportsData.filter((sport) => {
		return sport.abbrv === props.query.sport.toUpperCase();
	});

	return (
		<Container fluid>
			<h1>{sportData[0].display_name}</h1>
			<SportCard
				key={sportData[0].id}
				sportData={sportData[0]}
				sportName={sportData[0].display_name}
				users={props.users}
			/>
		</Container>
	);
}

export default Games;

export async function getServerSideProps(context) {
	let users = await prisma.user.findMany();
	users = users.map((user) => {
		delete user.password;
		delete user.balance;
		delete user.paypal;
		delete user.emailVerified;
		delete user.createdAt;
		delete user.updatedAt;

		return user;
	});
	return {
		props: { query: context.query, users },
	};
}
