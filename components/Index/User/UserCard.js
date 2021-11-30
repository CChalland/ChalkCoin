import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export default function UserCard({ user }) {
	// console.log("UserCard - user", user);

	return (
		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Row className="align-items-center">
								<Col xs={"auto"}>
									<Image src={user?.image} thumbnail roundedCircle />
								</Col>
								<Col xs={"auto"}>
									<Row>
										<Col>
											<h1 className="my-0">{user?.username}</h1>
										</Col>
									</Row>
									<Row>
										<Col>
											<h1 className="my-0">${user?.balance}</h1>
										</Col>
									</Row>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
