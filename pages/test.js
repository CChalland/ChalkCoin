import { useEffect, useContext } from "react";
import { Container, Col, Row, Image, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import { BetContext } from "../contexts/Bets.Context";
import prisma from "../contexts/prisma";
import axios from "axios";

function Test(props) {
	const bets = useContext(BetContext);
	const getData = async () => {
		let data;
		try {
			const res = await axios.post(`/api/test`, {
				amount: 12.5,
				details: { type: "Mine Reward" },
				recipient: "71db005c-37d1-4147-aa15-3c0c28c3178c",
				sender: "00",
				transactionId: "87cd39c05a9a11ec85435990eeec35b4",
			});
			console.log(res);
			data = res.data;
		} catch (err) {
			console.log(err.message);
		}
		return data;
	};

	useEffect(() => {
		getData();
	}, []);

	// console.log(bets);

	return (
		<Container fluid>
			<Row>Testing</Row>
		</Container>
	);
}

export default Test;

export async function getServerSideProps(context) {
	// const odds = await fetchData("americanfootball_nfl");
	let users = await prisma.user.findMany();
	users = users.map((user) => {
		delete user.emailVerified;
		delete user.createdAt;
		delete user.updatedAt;

		return user;
	});

	return {
		props: { users },
	};
}
