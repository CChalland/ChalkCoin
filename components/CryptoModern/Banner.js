import Link from "next/link";
import React from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import bannerImg from "../../assets/image/banner-bg.png";

export default function Banner({ user }) {
	console.log("banner - user", user);

	return (
		<Container>
			{user.image ? (
				<Row>
					<Col>
						<Card>
							<Card.Body>
								<Row className="align-items-center">
									<Col xs={"auto"}>
										<Image src={user.image} thumbnail roundedCircle />
									</Col>
									<Col xs={"auto"}>
										<Row>
											<Col>
												<h1 className="my-0">{user.username}</h1>
											</Col>
										</Row>
										<Row>
											<Col>
												<h1 className="my-0">${user.balance}</h1>
											</Col>
										</Row>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			) : (
				<Row className="align-items-center">
					<Col xs={12} sm={"auto"} md={6}>
						<Row>
							<Col>
								<Fade up delay={100}>
									<h1 className="text-center">Sports Betting with Crypto</h1>
								</Fade>
							</Col>
						</Row>

						<Row>
							<Col>
								<Fade up delay={200}>
									<h5 className="text-secondary text-center">
										BEToken is a blockchain ledger featuring bets on all your favorite games, including
										College Football & Basketball, NFL, MLB, NBA, NHL, WNBA, and MLS. Sign Up to get tokens to
										START BETTING!
									</h5>
								</Fade>
							</Col>
						</Row>

						<Row className="justify-content-center">
							<Fade up delay={300}>
								<Col xs={6} className="ml-0 pl-0 mr-1 pr-1">
									<Link href="/login">
										<Button className="" variant="primary" style={{ minWidth: "120px" }}>
											GET TOKEN
										</Button>
									</Link>
								</Col>
								<Col xs={6} className="mr-0 pr-0 ml-1 pl-1">
									<Link href="/bets">
										<Button className="btn-outline" variant="default" style={{ minWidth: "120px" }}>
											BETS
										</Button>
									</Link>
								</Col>
							</Fade>
						</Row>
					</Col>

					<Col sm={"auto"} md={6}>
						<Fade in delay={100}>
							<Image fluid src={bannerImg} alt="Banner" />
						</Fade>
					</Col>
				</Row>
			)}
		</Container>
	);
}
