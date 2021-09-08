import React, { useState } from "react";
import { getSession, useSession } from "next-auth/client";
// react-bootstrap components
import { Badge, Button, Card, Form, InputGroup, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";

// async function saveUser(user) {
// 	const response = await fetch("/api/users", {
// 		method: "POST",
// 		body: JSON.stringify(user),
// 	});
// 	if (!response.ok) {
// 		throw new Error(response.statusText);
// 	}

// 	return await response.json();
// }

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
	let user = props;

	const [name, setName] = useState(user?.name);
	const [nameState, setNameState] = useState(true);
	const [email, setEmail] = useState(user?.email);
	const [emailState, setEmailState] = useState(true);
	const [password, setPassword] = useState(user?.password);
	const [passwordState, setPasswordState] = useState(true);
	const [imageURL, setImageURL] = useState(user?.image);
	const [imageURLState, setImageURLState] = useState(true);

	// const updateUser = async (event) => {
	// 	event.preventDefault();

	// 	const res = await fetch("http://localhost:4000/api/users", {
	// 		body: JSON.stringify({
	// 			name,
	// 			email,
	// 			password,
	// 			imageURL,
	// 		}),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		method: "POST",
	// 	});

	// 	user = await res.json();
	// 	// result.user => 'Ada Lovelace'
	// };

	return (
		<>
			<Container fluid>
				<div className="section-image" data-image="../assets/img/bg5.jpg">
					<Container>
						<Row>
							<Col md="8" sm="6">
								<Form action="POST" className="form" method="/api/users">
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
													<Form.Group className={passwordState ? "has-success" : "has-error"}>
														<label>Password</label>
														<Form.Control
															placeholder="Password"
															name="password"
															type="password"
															value={password}
															onChange={(e) => {
																setPassword(e.target.value);
																if (isRequired(e.target.value)) {
																	setPasswordState(true);
																} else {
																	setPasswordState(false);
																}
															}}
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
							<Col md="4">
								<Card className="card-user">
									<Card.Header className="no-padding">
										<div className="card-image">
											<img alt="..." src={require("../assets/img/full-screen-image-3.jpg")}></img>
										</div>
									</Card.Header>
									<Card.Body>
										<div className="author">
											<a href="#pablo" onClick={(e) => e.preventDefault()}>
												<img alt="..." className="avatar border-gray" src=""></img>
												<Card.Title as="h5">Tania Keatley</Card.Title>
											</a>
											<p className="card-description">michael24</p>
										</div>
										<p className="card-description text-center">
											Hey there! As you can see, <br></br>
											it is already looking great.
										</p>
									</Card.Body>
									<Card.Footer>
										<hr></hr>
										<div className="button-container text-center">
											<Button
												className="btn-simple btn-icon"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
												variant="link"
											>
												<i className="fab fa-facebook-square"></i>
											</Button>
											<Button
												className="btn-simple btn-icon"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
												variant="link"
											>
												<i className="fab fa-twitter"></i>
											</Button>
											<Button
												className="btn-simple btn-icon"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
												variant="link"
											>
												<i className="fab fa-google-plus-square"></i>
											</Button>
										</div>
									</Card.Footer>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
			</Container>
		</>
	);
}

export default UserPage;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	let user = await prisma.user.findUnique({
		where: { id: session.user.id },
	});
	user.emailVerified = JSON.stringify(user.emailVerified);
	user.createdAt = JSON.stringify(user.createdAt);
	user.updatedAt = JSON.stringify(user.updatedAt);

	return {
		props: { user },
	};
}
