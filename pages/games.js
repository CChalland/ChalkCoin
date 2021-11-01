import React, { useContext, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SportContext, SportDispatch } from "../contexts/Sports.Context";
import GameCard from "../components/Game/GameCard";
import prisma from "../contexts/prisma";
import { getSession } from "next-auth/client";

function Games(props) {
	const { sportsData } = useContext(SportContext);
	const dispatch = useContext(SportDispatch);
	let sportData = sportsData.filter((sport) => {
		return sport.abbrv === props.query.sport.toUpperCase();
	});

	const getData = useCallback(async () => {
		let preGames,
			inGames,
			postGames,
			leagueData,
			sortedGames = [];

		if (sportData[0].reload) {
			axios
				.get(
					`http://site.api.espn.com/apis/site/v2/sports/${sportData[0].sport}/${sportData[0].league_name}/scoreboard`
				)
				.then((response) => {
					leagueData = response.data;
					inGames = response.data.events.filter((game) => {
						reloadData = true;
						return game.status.type.state === "in";
					});
					postGames = response.data.events.filter((game) => {
						return game.status.type.state === "post";
					});
					preGames = response.data.events.filter((game) => {
						return game.status.type.state === "pre";
					});

					if (inGames.length === 0) reloadData = false;
					sortedGames.push(inGames, postGames, preGames);
					leagueData.events = sortedGames.flat();
					dispatch({ type: sportName, data: leagueData, reload: reloadData });

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
	if (sportData[0].data.events) {
		gameItems = sportData[0].data.events.map((game, key) => {
			return (
				<GameCard
					key={key}
					panelKey={key}
					gameData={game}
					sportName={sportData[0].display_name}
					users={props.users}
					currentUser={props.currentUser}
				/>
			);
		});
	} else {
		gameItems = <h1>Loading</h1>;
	}

	console.log(sportData);

	return (
		<Container fluid>
			<h1>{sportData[0].display_name}</h1>
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
