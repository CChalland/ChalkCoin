import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { SportContext, SportDispatch } from "../contexts/Sports.Context";
import GameCard from "../components/Game/GameCard";
import prisma from "../contexts/prisma";
import axios from "axios";
import { getSession } from "next-auth/client";
// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/betoken-bootstrap-react.scss?v=2.0.0";
import "assets/css/Custom.css";

function Games(props) {
	const { sportsData } = useContext(SportContext);
	const dispatch = useContext(SportDispatch);
	let sportData = sportsData.find((sport) => {
		return sport.abbrv === props.query.sport.toUpperCase();
	});

	const getData = useCallback(async () => {
		let preGames,
			inGames,
			postGames,
			leagueData,
			sortedGames = [];

		if (sportData.reload) {
			axios
				.get(
					`http://site.api.espn.com/apis/site/v2/sports/${sportData.sport}/${sportData.league_name}/scoreboard`
				)
				.then((response) => {
					leagueData = response.data;
					inGames = response.data.events.filter((game) => {
						sportData.reload = true;
						return game.status.type.state === "in";
					});
					postGames = response.data.events.filter((game) => {
						return game.status.type.state === "post";
					});
					preGames = response.data.events.filter((game) => {
						return game.status.type.state === "pre";
					});

					if (inGames.length === 0) sportData.reload = false;
					sortedGames.push(inGames, postGames, preGames);
					leagueData.events = sortedGames.flat();
					dispatch({ type: sportData.display_name, data: leagueData, reload: sportData.reload });

					console.log(sortedGames.flat());
				});
		}
	});

	useEffect(() => {
		const timeOut = setTimeout(() => {
			getData();
		}, 15000);

		return () => {
			clearTimeout(timeOut);
		};
	});

	let gameItems;
	if (sportData.data.events) {
		gameItems = sportData.data.events.map((game, key) => {
			return (
				<Row className="my-3" key={game.id}>
					<GameCard
						panelKey={key}
						gameData={game}
						sportName={sportData.display_name}
						users={props.users}
						currentUser={props.currentUser}
						completed={game.status.type.completed}
					/>
				</Row>
			);
		});
	} else {
		gameItems = <h1>Loading</h1>;
	}

	return (
		<Container fluid>
			<h1>{sportData.display_name}</h1>
			{gameItems}
		</Container>
	);
}

export default Games;

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	let currentUser = {};
	let users = [];
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

		users = await prisma.user.findMany();
		users = users
			.map((user) => {
				delete user.password;
				delete user.balance;
				delete user.paypal;
				delete user.emailVerified;
				delete user.createdAt;
				delete user.updatedAt;

				return user;
			})
			.filter((user) => {
				return user.id !== currentUser.id;
			});
	}

	return {
		props: { query: context.query, users, currentUser },
	};
}
