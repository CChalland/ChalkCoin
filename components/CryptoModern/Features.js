import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import featureIcon1 from "../../assets/image/feature-1.png";
import featureIcon2 from "../../assets/image/feature-2.png";
import featureIcon3 from "../../assets/image/feature-3.png";
import featureIcon4 from "../../assets/image/feature-4.png";

export default function Features() {
	const data = [
		{
			id: 1,
			icon: featureIcon1,
			title: "Great Market Value",
			description:
				"The leading digital currency by market capitalization, has grown in value by more than 10 times.",
		},
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
			<Row className="justify-content-center">
				<Fade up delay={100}>
					<h1>Why choose BEToken</h1>
				</Fade>
			</Row>
			<Row className="justify-content-center">
				<Fade up delay={200}>
					<h5 className="text-secondary">
						Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor Lorem ipsum
						dolor
					</h5>
				</Fade>
			</Row>

			<Row>
				{data.map((item) => {
					return (
						<Col key={item.id}>
							<Row className="justify-content-center">
								<Image fluid src={item.icon} alt={item.tittle} />
							</Row>
							<Row className="justify-content-center">
								<h4>{item.title}</h4>
							</Row>
							<Row className="justify-content-center">
								<h5 className="text-center text-secondary">{item.description}</h5>
							</Row>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
