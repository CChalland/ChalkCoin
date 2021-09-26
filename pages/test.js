import React, { useState, useContext } from "react";
import { Container, Col, Row, Image, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";
import prisma from "../contexts/prisma";
import axios from "axios";

const fetchData = async () =>
	await axios
		.get(`https://api.the-odds-api.com/v4/sports?apiKey=${process.env.ODDS_API_KEY}`)
		.then((res) => ({
			error: false,
			odds: res.data,
		}))
		.catch(() => ({
			error: true,
			odds: null,
		}));

function Test(props) {
	const { sportsData } = useContext(SportContext);
	let sportName = "NFL";
	let sportData = sportsData.filter((sport) => {
		return sport.abbrv === sportName;
	});

	let gameData, gameScoreData;
	if (sportData.data?.events) {
		gameData = sportData[0].data?.events[0];
		gameScoreData = GameScoreHelper(gameData, sportName);
	}

	console.log(props.odds);

	return (
		<Container fluid>
			<Row>
				<Col xs={4}>
					<Button className="btn-outline" variant="default">
						<Image width={30} src={"../static/media/sports-icons/2.png"} rounded />
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Test;

export async function getServerSideProps(context) {
	// const odds = await fetchData();
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
