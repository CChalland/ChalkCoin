import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import Illustration from "../../assets/image/illustration1.png";

export default function Privacy() {
	return (
		<Container>
			<Row className="align-items-center my-5">
				<Col>
					<Row>
						<Col>
							<h1>Privacy Preserving Anonymous Funds Protocol</h1>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5 className="text-secondary">
								Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit amet
								consectetur adipisicing elit sed eiu
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
