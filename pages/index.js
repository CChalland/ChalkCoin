import { Container, Row, Col } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";

function IndexPage(props) {
	const [session, loading] = useSession();

	console.log(session);

	return (
		<Container fluid>
			<Row>Index</Row>
		</Container>
	);
}

export default IndexPage;
