import React, { useState, useContext } from "react";
import { Container, Col, Row, Image, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { GameScoreHelper, GamePlayHelper, GameLeadersHelper } from "../helpers/SportCard";
import prisma from "../contexts/prisma";
import { Doughnut } from "react-chartjs-2";

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

	console.log(gameScoreData);

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
					<div className="chart-relative">
						<Doughnut data={data} height={100} width={100} options={{ cutoutPercentage: 80 }} />
						<div className="chart-absolute-center chart-text-center">
							<div className="data-chart">
								<div class="inner-circle">
									<span class="home-team">MIN</span>
									<span class="away-team">ARI</span>
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
