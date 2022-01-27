import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import BetCard from "../../Bet/BetCard";
import Loading from "../../Utility/Loading";

export default function ExpiringBets({ bets, user, loaded }) {
	const [expiringBets, setExpiringBets] = useState([]);

	useEffect(() => {
		setExpiringBets(bets.sort((a, b) => new Date(a.event.date) - new Date(b.event.date)));
	}, [bets]);

	return loaded ? (
		<Container fluid className="mx-0 px-0">
			{expiringBets.length !== 0 ? (
				<Row>
					<Col>
						<h1 className="mb-2" style={{ fontSize: 32 }}>
							Expiring Bets
						</h1>
					</Col>
				</Row>
			) : null}

			<div className="mx-0 px-0" style={{ overflowY: "auto", maxHeight: "500px" }}>
				{expiringBets.map((bet) => (
					<BetCard acceptState={true} bet={bet} currentUser={user} key={bet.id} index={true} />
				))}
			</div>
		</Container>
	) : (
		<Loading />
	);
}
