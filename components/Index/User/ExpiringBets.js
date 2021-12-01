import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import BetCard from "../../Bet/BetCard";

export default function ExpiringBets({ bets, user }) {
	const [expiringBets, setExpiringBets] = useState([]);

	useEffect(() => {
		setExpiringBets(bets.sort((a, b) => new Date(a.event.date) - new Date(b.event.date)));
	}, [bets]);

	return (
		<Container fluid>
			<Row>
				<Col>
					<h1>Expiring Bets</h1>
				</Col>
			</Row>

			{expiringBets.map((bet) => (
				<BetCard acceptState={true} bet={bet} currentUser={user} key={bet.id} />
			))}
		</Container>
	);
}
