import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fade } from "react-awesome-reveal";
import BetCard from "../../Bet/BetCard";

export default function ExpiringBets({ bets, user }) {
	const [expiringBets, setExpiringBets] = useState([]);

	useEffect(() => {
		setExpiringBets(bets.sort((a, b) => new Date(a.event.date) - new Date(b.event.date)));
	}, [bets]);

	return (
		<Container fluid className="mx-0 px-0">
			<Row>
				<Col>
					<h1>Expiring Bets</h1>
				</Col>
			</Row>

			<div className="mx-0 px-0" style={{ overflowY: "auto", maxHeight: "500px" }}>
				{expiringBets.map((bet) => (
					<BetCard acceptState={true} bet={bet} currentUser={user} key={bet.id} index={true} />
				))}
			</div>
		</Container>
	);
}
