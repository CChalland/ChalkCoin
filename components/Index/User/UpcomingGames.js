import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import GameCard from "../../Game/GameCard";

export default function UpcomingGames({ games, currentUser, users }) {
	const [upcomingGames, setUpcomingGames] = useState([]);

	useEffect(() => {
		setUpcomingGames(games.sort((a, b) => new Date(a.date) - new Date(b.date)));
	}, [games]);

	console.log("UpcomingGames - games", games);
	console.log("UpcomingGames - upcomingGames", upcomingGames);

	return (
		<Container fluid>
			<Row>
				<Col>
					<h1>Upcoming Games</h1>
				</Col>
			</Row>

			{upcomingGames.map((game, key) => {
				return (
					<Row className="my-3" key={game.id}>
						<GameCard
							panelKey={key}
							gameData={game}
							sportName={game.sport}
							users={users}
							currentUser={currentUser}
							completed={game.status.type.completed}
						/>
					</Row>
				);
			})}
		</Container>
	);
}
