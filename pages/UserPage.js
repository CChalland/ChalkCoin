import React, { useState } from "react";
import { getSession, useSession } from "next-auth/client";
// react-bootstrap components
import { Badge, Button, Card, Form, InputGroup, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";

async function saveUser(user) {
	const response = await fetch("/api/users", {
		method: "POST",
		body: JSON.stringify(user),
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}

const emailValidation = (value) =>
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
const urlValidation = (value) => {
	let returnValue = true;
	try {
		new URL(value);
	} catch (e) {
		returnValue = false;
	} finally {
		return returnValue;
	}
	return false;
};
const isRequired = (value) => value !== null && value !== "" && value;

function UserPage(props) {
	console.log(props);
	let user;

	const [name, setName] = useState(user?.name);
	const [nameState, setNameState] = useState(true);
	const [email, setEmail] = useState(user?.email);
	const [emailState, setEmailState] = useState(true);
	const [password, setPassword] = useState("");
	const [passwordState, setPasswordState] = useState(true);
	const [imageURL, setImageURL] = useState(user?.image);
	const [imageURLState, setImageURLState] = useState(true);

	return (
		<>
			<Container fluid>
				<Container>
					<Row>
						<Col md="8" sm="6">
							<Form action="" className="form" method="">
								<Card>
									<Card.Header>
										<Card.Header>
											<Card.Title as="h4">Edit Profile</Card.Title>
										</Card.Header>
									</Card.Header>
									<Card.Body>
										<Row>
											<Col className="pr-1" md="5">
												<Form.Group className={nameState ? "has-success" : "has-error"}>
													<label>Name</label>
													<Form.Control
														placeholder="Name"
														name="name"
														type="text"
														value={name}
														onChange={(e) => {
															setName(e.target.value);
															if (isRequired(e.target.value)) {
																setNameState(true);
															} else {
																setNameState(false);
															}
														}}
													></Form.Control>
												</Form.Group>
											</Col>
											<Col className="pl-1" md="4">
												<Form.Group className={emailState ? "has-success" : "has-error"}>
													<label htmlFor="exampleInputEmail1">Email address</label>
													<Form.Control
														placeholder="Email"
														name="email"
														type="text"
														value={email}
														onChange={(e) => {
															setEmail(e.target.value);
															if (emailValidation(e.target.value)) {
																setEmailState(true);
															} else {
																setEmailState(false);
															}
														}}
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="6">
												<Form.Group>
													<label>Password</label>
													<Form.Control
														// value={user.password}
														placeholder="Password"
														type="password"
													></Form.Control>
												</Form.Group>
											</Col>
											<Col className="pl-1" md="6">
												<Form.Group className={imageURLState ? "has-success" : "has-error"}>
													<label>Image</label>
													<Form.Control
														placeholder="URL"
														name="image"
														type="text"
														value={imageURL}
														onChange={(e) => {
															setImageURL(e.target.value);
															if (urlValidation(e.target.value)) {
																setImageURLState(true);
															} else {
																setImageURLState(false);
															}
														}}
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>
									</Card.Body>
									<Card.Footer>
										<Button className="btn-fill pull-right" type="submit" variant="info">
											Update Profile
										</Button>
										<div className="clearfix"></div>
									</Card.Footer>
								</Card>
							</Form>
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
}

UserPage.getInitialProps = async (ctx) => {
	const session = await getSession(ctx);
	// const prisma = new PrismaClient();
	// if (session) {
	// 	const user = await prisma.user.findUnique({
	// 		where: {
	// 			email: session.user.email,
	// 		},
	// 		include: { requester: true, accepter: true },
	// 	});
	// }
	return { session };
};

export default UserPage;
