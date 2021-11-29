import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import featureIcon1 from "../../assets/image/feature-1.png";
import featureIcon2 from "../../assets/image/feature-2.png";
import featureIcon3 from "../../assets/image/feature-3.png";
import featureIcon4 from "../../assets/image/feature-4.png";

export default function Features() {
	const data = [
		// {
		// 	id: 1,
		// 	icon: featureIcon1,
		// 	title: "Great Market Value",
		// 	description:
		// 		"The leading digital currency by market capitalization, has grown in value by more than 10 times.",
		// },
		{
			id: 2,
			icon: featureIcon2,
			title: "Verified Mining",
			description: "Your mining rigs are already set up and running. As soon as you set up your account.",
		},
		{
			id: 3,
			icon: featureIcon3,
			title: "Fastest Miner",
			description:
				"Don’t wrestle with rig assembly and hot, noisy miners at home. We have the fastest bitcoin mining.",
		},
		{
			id: 4,
			icon: featureIcon4,
			title: "Secure Transactions",
			description: "You can mine any cryptocurrency available in our catalogue! Switch your mining power.",
		},
	];

	return (
		<Container>
			<Row className="justify-content-center mt-5">
				<Fade up delay={100}>
					<h1>Why BEToken</h1>
				</Fade>
			</Row>
			<Row className="justify-content-center mb-4">
				<Col className="text-center">
					<Fade up delay={200}>
						<h5 className="text-secondary">
							BEToken is a digital form of money that is a more secure medium of exchange. The big idea is
							that because transactions are public, irreversible, mostly unhackable, and controlled by the
							people, users and their digital finances are more protected. Of course, many benefits come with
							cryptocurrency.
						</h5>
					</Fade>
				</Col>
			</Row>

			<Row className="justify-content-center mb-3">
				{data.map((item) => {
					return (
						<Col key={item.id} xs={12} sm={6} md={3}>
							<Row className="justify-content-center">
								<Col className="text-center">
									<Image fluid src={item.icon} alt={item.tittle} />
								</Col>
							</Row>
							<Row className="justify-content-center">
								<Col className="text-center">
									<h4>{item.title}</h4>
								</Col>
							</Row>
							<Row className="justify-content-center">
								<Col className="text-center">
									<h5 className="text-secondary">{item.description}</h5>
								</Col>
							</Row>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
