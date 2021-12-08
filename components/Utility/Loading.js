import { Container, Col, Row, Spinner } from "react-bootstrap";

const Loading = () => {
	return (
		<Container fluid>
			<Row className="justify-content-center">
				<Col xs={"auto"}>
					<Spinner animation="border" variant="info" />
				</Col>
			</Row>
		</Container>
	);
};

export default Loading;
