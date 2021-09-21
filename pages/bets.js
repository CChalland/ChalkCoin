import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { getSession } from "next-auth/client";
import BetCard from "../components/BetCard";

async function fetchBetsJSON() {
	const res = await fetch("http://localhost:4000/api/bets");
	const bets = await res.json();
	return bets;
}

function Bets(props) {
	const { sportsData } = useContext(SportContext);
	const { bets } = props;

	// useEffect(() => {
	// 	const getData = async () => {
	// 		fetchBetsJSON().then((bets) => {
	// 			setBets(bets);
	// 		});
	// 	};
	// 	getData();
	// }, []);

	const betsData = bets?.map((bet) => {
		const sport = sportsData.find((sport) => sport.display_name === bet.details.displayName);
		const event = sport.data.events?.find((event) => event.id === bet.details.id);
		return { ...bet, event };
	});

	return (
		<Container fluid>
			<h1>BETS</h1>
			<BetCard betsData={betsData} currentUser={props.currentUser} />
		</Container>
	);
}

export default Bets;

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	let currentUser = {};
	if (session) {
		currentUser = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
		});
		delete currentUser.password;
		delete currentUser.paypal;
		delete currentUser.emailVerified;
		delete currentUser.createdAt;
		delete currentUser.updatedAt;
	}

	let betsData = await prisma.bet.findMany({
		where: {
			accepted: false,
		},
	});
	const betPromises = betsData.map(async (bet) => {
		bet.details = JSON.parse(bet.details);
		bet.createdAt = JSON.stringify(bet.createdAt);
		bet.updatedAt = JSON.stringify(bet.updatedAt);
		return bet;
	});
	const bets = await Promise.all(betPromises);

	return {
		props: { currentUser, bets },
	};
}
