import { Container, Row, Col, Image } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import Illustration from "../../../assets/image/illustration1.png";

export default function Privacy() {
	return (
		<Container>
			<Row className="align-items-center my-5">
				<Col>
					<Row>
						<Col className="text-center">
							<h1>Privacy Preserving Anonymous Funds Protocol</h1>
						</Col>
					</Row>
					<Row>
						<Col className="text-center">
							<h5 className="text-secondary">
								BEToken is designed to add a layer of privacy to the benefits and functionality of crypto. It
								can keep information about its users hidden.
							</h5>
						</Col>
					</Row>
				</Col>
				<Col>
					<Fade up>
						<Image fluid src={Illustration} />
					</Fade>
				</Col>
			</Row>
		</Container>
	);
}
