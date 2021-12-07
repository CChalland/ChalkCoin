import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export default function UserCard({ user, bets }) {
	const [totalBets, setTotalBets] = useState(0);

	// console.log("UserCard - bets", user);

	useEffect(() => {
		setTotalBets(user.openBets?.length + user.acceptedBets?.length + user.completedBets?.length);
	}, [user]);

	return (
		<Container fluid>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Row className="align-items-center ">
								<Col xs={"auto"}>
									<Image width={100} src={user?.image} thumbnail roundedCircle />
								</Col>

								<Col>
									<Row>
										<Col>
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												USERNAME
											</h4>
										</Col>
									</Row>
									<Row>
										<Col>
											<h1 className="my-0">{user?.username}</h1>
										</Col>
									</Row>
								</Col>

								<Col>
									<Row>
										<Col>
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												BALANCE
											</h4>
										</Col>
									</Row>
									<Row>
										<Col>
											<h1 className="my-0">${user?.balance}</h1>
										</Col>
									</Row>
								</Col>

								<Col>
									<Row>
										<Col>
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												TOTAL BETS
											</h4>
										</Col>
									</Row>
									<Row>
										<Col>
											<h1 className="my-0">{totalBets}</h1>
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
