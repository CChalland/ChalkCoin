import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import bannerImg from "../../assets/image/banner-bg.png";

export default function Banner() {
	return (
		<Container>
			<Row className="align-items-center">
				<Col>
					<Row>
						<Col>
							<Fade up delay={100}>
								<h1>Welcome next level cryptocurrency token with faster</h1>
							</Fade>
						</Col>
					</Row>
					<Row>
						<Col>
							<Fade up delay={200}>
								<h5 className="text-secondary">
									Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore
									dolore magna ipsum dolor sit amet consectetur.
								</h5>
							</Fade>
						</Col>
					</Row>
					<Row>
						<Fade up delay={300}>
							<Col>
								<Button className="btn-wd" variant="primary">
									GET TOKEN
								</Button>
							</Col>
							<Col>
								<Button className="btn-outline btn-wd" variant="default">
									BETS
								</Button>
							</Col>
						</Fade>
					</Row>
				</Col>
				<Col>
					<Fade in delay={100}>
						<Image fluid src={bannerImg} alt="Banner" />
					</Fade>
				</Col>
			</Row>
		</Container>
	);
}
