import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export default function WalletSection() {
	const data = [
		{
			id: 1,
			icon: "/img/icons/blue/wallet1.png",
			title: "Secure transfers with verified Markets.",
		},
		{
			id: 2,
			icon: "/img/icons/blue/wallet2.png",
			title: "Easy to create and accept bets within the wallet",
		},
		{
			id: 3,
			icon: "/img/icons/blue/wallet3.png",
			title: "Pay as many as you want",
		},
	];

	return (
		<Container>
			<Row className="align-items-center">
				<Col className="d-none d-md-block d-xl-block">
					<Image fluid src="/img/icons/blue/illustration2.png" alt="Wallet Image" />
				</Col>

				<Col>
					<Row>
						<Col>
							<h1>Our wallet is built for the crypto beginner</h1>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5 className="text-secondary">
								{
									"ChalkCoin's wallet stores the bets transactions. In addition to this basic function of storing the keys, our wallet offers the functionality of encrypting and/or signing information."
								}
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
						<Col xs={6} sm={"auto"} className="mx-0 px-1">
							<Button className="btn-outline" variant="default">
								<Row className="align-items-center">
									<Col xs={"auto"}>
										<Image fluid src="/img/icons/apple.png" alt="Apple" />
									</Col>
									<Col className="ml-0 pl-0">APP STORE</Col>
								</Row>
							</Button>
						</Col>
						<Col xs={6} sm={"auto"} className="mx-0 px-1">
							<Button className="btn-outline" variant="default">
								<Row className="align-items-center">
									<Col xs={"auto"}>
										<Image fluid src="/img/icons/playstore.png" alt="Play" />
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
