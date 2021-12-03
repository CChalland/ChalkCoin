import { useState, useContext } from "react";
import { Container, Col, Row, Image, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import { BetContext } from "../contexts/Bets.Context";
import prisma from "../contexts/prisma";
import axios from "axios";

function Test(props) {
	const bets = useContext(BetContext);
	const getData = async () => {
		let data;
		try {
			await axios.post(`/api/test`, { amount: "1" }).then((res) => {
				data = res.data;
				console.log(data);
			});
		} catch (err) {
			console.log(err.message);
		}
		return data;
	};
	getData();

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
