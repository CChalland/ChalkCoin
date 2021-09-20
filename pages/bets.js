import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
// import prisma from "../contexts/prisma";
import { getSession } from "next-auth/client";
import axios from "axios";

async function fetchBetsJSON() {
	const res = await fetch("http://localhost:4000/api/bets");
	const bets = await res.json();
	return bets;
}

function Bets(props) {
	const [bets, setBets] = useState([]);
	console.log(props);

	useEffect(() => {
		const getData = async () => {
			fetchBetsJSON().then((bets) => {
				setBets(bets);
			});
		};
		getData();
	}, []);

	console.log("api bets", bets);
	return (
		<Container>
			<div>BETS</div>
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

	let bets = await prisma.bet.findMany({
		where: {
			accepted: false,
		},
	});
	const betPromises = bets.map(async (bet) => {
		bet.details = JSON.parse(bet.details);
		bet.createdAt = JSON.stringify(bet.createdAt);
		bet.updatedAt = JSON.stringify(bet.updatedAt);
		return bet;
	});
	const betsData = await Promise.all(betPromises);

	return {
		props: { currentUser, betsData },
	};
}
