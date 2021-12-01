import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import GameCard from "../../Game/GameCard";

export default function UpcomingGames({ games, currentUser, users }) {
	const [upcomingGames, setUpcomingGames] = useState([]);

	useEffect(() => {
		setUpcomingGames(games.sort((a, b) => new Date(a.date) - new Date(b.date)));
	}, [games]);

	// console.log("UpcomingGames - games", games);
	// console.log("UpcomingGames - upcomingGames", upcomingGames);

	return (
		<Container fluid className="mx-0 px-0">
			<Row>
				<Col>
					<h1>Upcoming Games</h1>
				</Col>
			</Row>

			<div className="mx-0 px-0" style={{ overflowY: "auto", maxHeight: "500px" }}>
				{upcomingGames.map((game, key) => {
					return (
						<Row className="my-3 mx-0 px-0" key={game.id}>
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
			</div>
		</Container>
	);
}
