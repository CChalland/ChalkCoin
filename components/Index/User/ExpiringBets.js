import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export default function ExpiringBets({ bets }) {
	// console.log("ExpiringBets - bets", bets);

	return (
		<Container fluid>
			<Row>
				<Col>
					<h1>Expiring Bets</h1>
				</Col>
			</Row>

			<Row></Row>
		</Container>
	);
}
