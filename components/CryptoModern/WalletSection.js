import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import WalletImg from "../../assets/image/illustration2.png";
import AppleIcon from "../../assets/image/apple.png";
import PlayIcon from "../../assets/image/playstore.png";
import walletIcon1 from "../../assets/image/wallet1.png";
import walletIcon2 from "../../assets/image/wallet2.png";
import walletIcon3 from "../../assets/image/wallet3.png";

export default function WalletSection() {
	const data = [
		{
			id: 1,
			icon: walletIcon1,
			title: "Secure transfers with verified Casinos.",
		},
		{
			id: 2,
			icon: walletIcon2,
			title: "Easily buy and sell CLV within the wallet",
		},
		{
			id: 3,
			icon: walletIcon3,
			title: "Pay as many as you want",
		},
	];

	return (
		<Container>
			<Row className="align-items-center">
				<Col>
					<Image fluid src={WalletImg} alt="Wallet Image" />
				</Col>
				<Col>
					<Row>
						<Col>
							<h1>Our wallet is built for the cryptocurrency beginner</h1>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5 className="text-secondary">
								Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit elit sed
								eiu Lorem ipsum dolor sit .
							</h5>
						</Col>
					</Row>
					<Fade up>
						{data.map((item) => {
							return (
								<Row key={item.id} className="align-items-center">
									<Col xs={1} className="mt-2">
										<Image fluid src={item.icon} alt={item.title} />
									</Col>
									<Col>
										<h4>{item.title}</h4>
									</Col>
								</Row>
							);
						})}
					</Fade>
					<Row className="justify-content-start">
						<Col xs={"auto"}>
							<Button className="btn-outline btn-wd" variant="default">
								<Row className="align-items-center">
									<Col xs={"auto"}>
										<Image fluid src={AppleIcon} alt="Apple" />
									</Col>
									<Col className="ml-0 pl-0">APP STORE</Col>
								</Row>
							</Button>
						</Col>
						<Col xs={"atuo"}>
							<Button className="btn-outline btn-wd" variant="default">
								<Row className="align-items-center">
									<Col xs={"auto"}>
										<Image fluid src={PlayIcon} alt="Play" />
									</Col>
									<Col className="ml-0 pl-0">PLAY STORE</Col>
								</Row>
							</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5 className="text-secondary" style={{ fontSize: 12 }}>
								*Windows app coming soon
							</h5>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
