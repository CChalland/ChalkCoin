import React, { useState, useContext } from "react";
import { Container, Col, Row, Image, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";
import prisma from "../contexts/prisma";
import axios from "axios";

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

	// console.log(gameScoreData);

	return (
		<Container fluid>
			<Row>
				<Col xs={4}></Col>
			</Row>
		</Container>
	);
}

export default Test;

export async function getServerSideProps(context) {
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
