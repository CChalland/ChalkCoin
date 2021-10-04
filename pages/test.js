import React, { useState, useContext } from "react";
import { Container, Col, Row, Image, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";
import prisma from "../contexts/prisma";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const fetchData = async (sportKey) =>
	await axios
		.get(
			`https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?regions=us&oddsFormat=american&apiKey=${process.env.ODDS_API_KEY}`
		)
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

	const data = {
		datasets: [
			{
				data: [34.7, 65.0],
				backgroundColor: ["rgb(101, 4, 21)", "rgb(5, 37, 112)"],
			},
		],
	};

	return (
		<Container fluid>
			<Row>
				<Col xs={4}>
					<Button className="btn-outline" variant="default">
						<Image width={30} src={"../static/media/sports-icons/2.png"} rounded />
					</Button>
				</Col>
			</Row>

			<Row>
				<Col xs={4}>
					<div className="chart-relative">
						<Doughnut
							data={data}
							options={{ cutoutPercentage: 80, responsive: true, maintainAspectRatio: true }}
						/>
						<div className="chart-absolute-center chart-text-center">
							<div className="data-chart">
								<div className="inner-circle">
									<span className="home-team">MIN</span>
									<span className="away-team">ARI</span>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
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
