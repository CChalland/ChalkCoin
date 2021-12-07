import { useContext } from "react";
import { getSession } from "next-auth/client";
import { Container, Row } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { UserContext } from "../contexts/User.Context";
import GameCard from "../components/Game/GameCard";

function Games({ query, users }) {
	const currentUser = useContext(UserContext);
	const sportsData = useContext(SportContext);
	let sportData = sportsData.find((sport) => {
		return sport.abbrv === query.sport.toUpperCase();
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
						users={users}
						currentUser={currentUser}
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
	let users = [];
	if (session) {
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
				return user.id !== session.user.id;
			});
	}

	return {
		props: { query: context.query, users },
	};
}
