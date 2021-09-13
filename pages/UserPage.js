import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { Alert, Button, Card, Form, Collapse, Nav, Container, Row, Col } from "react-bootstrap";
import prisma from "../contexts/prisma";

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
const equalTo = (value1, value2) => value1 === value2;
const minLength = (value, length) => value.length >= length;

function UserPage(props) {
	let initialUser = {
		username: props.session.user.username ? props.session.user.username : "",
		name: props.session.user.name ? props.session.user.name : "",
		email: props.session.user.email ? props.session.user.email : "",
		image: props.session.user.image ? props.session.user.image : "../static/img/faces/face-0.jpg",
	};
	const [user, setUser] = useState(initialUser);
	const [newUserState, setNewUserState] = useState(false);
	const [updateSuccessState, setUpdateSuccessState] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [updateErrorState, setUpdateErrorState] = useState(false);
	const [username, setUsername] = useState(user.username);
	const [usernameState, setUsernameState] = useState(true);
	const [name, setName] = useState(user.name);
	const [nameState, setNameState] = useState(true);
	const [email, setEmail] = useState(user.email);
	const [emailState, setEmailState] = useState(true);
	const [imageURL, setImageURL] = useState(user.image);
	const [imageURLState, setImageURLState] = useState(true);
	const [password, setPassword] = useState("");
	const [passwordState, setPasswordState] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordState, setConfirmPasswordState] = useState(true);
	const [multipleExpandablePanels, setMultipleExpandablePanels] = React.useState([]);
	const router = useRouter();
	const toggleMultipleExpandablePanels = (event, value) => {
		if (multipleExpandablePanels.includes(value)) {
			setMultipleExpandablePanels(multipleExpandablePanels.filter((prop) => prop !== value));
		} else {
			setMultipleExpandablePanels([...multipleExpandablePanels, value]);
		}
	};

	let newUserAlert, updateSuccessAlert, updateErrorAlert;
	if (newUserState) {
		newUserAlert = (
			<Alert className="alert-with-icon" variant="danger">
				<button
					aria-hidden={true}
					className="close"
					data-dismiss="alert"
					type="button"
					onClick={() => {
						setNewUserState(false);
					}}
				>
					<i className="nc-icon nc-simple-remove"></i>
				</button>
				<span data-notify="icon" className="nc-icon nc-bell-55"></span>
				<span data-notify="message">Please fill in the required fields to complete registration</span>
			</Alert>
		);
	}
	if (updateSuccessState) {
		updateSuccessAlert = (
			<Alert className="alert-with-icon" variant="info">
				<button
					aria-hidden={true}
					className="close"
					data-dismiss="alert"
					type="button"
					onClick={() => {
						setUpdateSuccessState(false);
					}}
				>
					<i className="nc-icon nc-simple-remove"></i>
				</button>
				<span data-notify="icon" className="nc-icon nc-bell-55"></span>
				<span data-notify="message">Updated your settings</span>
			</Alert>
		);
	}
	if (updateErrorState) {
		updateErrorAlert = (
			<Alert className="alert-with-icon" variant="danger">
				<button
					aria-hidden={true}
					className="close"
					data-dismiss="alert"
					type="button"
					onClick={() => {
						setUpdateErrorState(false);
					}}
				>
					<i className="nc-icon nc-simple-remove"></i>
				</button>
				<span data-notify="icon" className="nc-icon nc-bell-55"></span>
				<span data-notify="message">
					{errorMessage ? errorMessage : "Please correct the highlighted fields"}
				</span>
			</Alert>
		);
	}

	const updateProfile = async () => {
		let updatedUser = {};
		if (username && (usernameState || isRequired(username))) updatedUser.username = username;
		if (name) updatedUser.name = name;
		if (email && (emailState || emailValidation(email))) updatedUser.email = email;
		if (imageURL && (imageURLState || urlValidation(imageURL))) updatedUser.image = imageURL;
		if (
			password &&
			confirmPassword &&
			(confirmPasswordState || minLength(confirmPassword, 1) || equalTo(confirmPassword, password))
		)
			updatedUser.password = confirmPassword;

		if (usernameState && emailState && passwordState && confirmPasswordState) {
			let response = await axios.post("http://localhost:4000/api/currentUser", updatedUser);
			console.log(response);
			if (response.data.id) {
				setUser(response.data);
				setUpdateSuccessState(true);
				setNewUserState(false);
				setUpdateErrorState(false);
				router.replace("/UserPage", undefined, { shallow: true });
			} else if (response.data.error) {
				setErrorMessage(response.data.error);
				setUpdateErrorState(true);
			}
		} else {
			setUpdateErrorState(true);
		}
	};

	useEffect(() => {
		if (router.query.newUser) {
			toggleMultipleExpandablePanels("e", 1);
			setNewUserState(true);
			if (!user.username) setUsernameState(false);
			if (!user.email) setEmailState(false);
			setPasswordState(false);
			setConfirmPasswordState(false);
		}
	}, [router]);

	return (
		<Container>
			<Row>
				<Col xs={{ span: 12, order: 2 }} md={{ span: 8, order: 1 }}>
					<Row>
						<Col xs={12}>
							<Form>
								<Card>
									<Card.Header>
										<Card.Header>
											<Nav>
												<Nav.Item as="h4" className="my-0 py-0">
													<Nav.Link
														data-toggle="collapse"
														aria-expanded={multipleExpandablePanels.includes(1)}
														onClick={(e) => toggleMultipleExpandablePanels(e, 1)}
													>
														<i className="nc-icon nc-preferences-circle-rotate"></i> Edit Profile
													</Nav.Link>
												</Nav.Item>
											</Nav>
											<br />
											{newUserAlert}
											{updateErrorAlert}
											{updateSuccessAlert}
										</Card.Header>
									</Card.Header>
									<Collapse className="collapse" id="collapseOne" in={multipleExpandablePanels.includes(1)}>
										<Card.Body>
											<Row>
												<Col className="pr-1">
													<Form.Group
														className={"has-label " + (usernameState ? "has-success" : "has-error")}
													>
														<label>
															Username <span className="star">*</span>
														</label>
														<Form.Control
															placeholder="Username"
															name="username"
															type="text"
															value={username}
															onChange={(e) => {
																setUsername(e.target.value);
																if (isRequired(e.target.value)) {
																	setUsernameState(true);
																} else {
																	setUsernameState(false);
																}
															}}
														></Form.Control>
														{usernameState ? null : <label className="error">This field is required.</label>}
													</Form.Group>
												</Col>
												<Col className="pl-1">
													<Form.Group className={"has-label " + (nameState ? "has-success" : "has-error")}>
														<label>Name</label>
														<Form.Control
															placeholder="Name"
															name="name"
															type="text"
															value={name}
															onChange={(e) => {
																setName(e.target.value);
																// if (isRequired(e.target.value)) {
																// 	setNameState(true);
																// } else {
																// 	setNameState(false);
																// }
															}}
														></Form.Control>
													</Form.Group>
												</Col>
											</Row>
											<Row>
												<Col className="pr-1">
													<Form.Group className={"has-label " + (emailState ? "has-success" : "has-error")}>
														<label>
															Email Address <span className="star">*</span>
														</label>
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
														{emailState ? null : <label className="error">This field is required.</label>}
													</Form.Group>
												</Col>
												<Col className="pl-1">
													<Form.Group
														className={"has-label " + (imageURLState ? "has-success" : "has-error")}
													>
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
														{imageURLState ? null : (
															<label className="error">This field has to be URL address.</label>
														)}
													</Form.Group>
												</Col>
											</Row>
											<Row>
												<Col className="pr-1">
													<Form.Group
														className={"has-label " + (passwordState ? "has-success" : "has-error")}
													>
														<label>
															Password <span className="star">*</span>
														</label>
														<Form.Control
															placeholder="Password"
															name="password"
															type="password"
															value={password}
															onChange={(e) => {
																setPassword(e.target.value);
																if (minLength(e.target.value, 1)) {
																	setPasswordState(true);
																} else {
																	setPasswordState(false);
																}
															}}
														></Form.Control>
														{passwordState ? null : <label className="error">This field is required.</label>}
													</Form.Group>
												</Col>
												<Col className="pl-1">
													<Form.Group
														className={"has-label " + (confirmPasswordState ? "has-success" : "has-error")}
													>
														<label>
															Confirm Password <span className="star">*</span>
														</label>
														<Form.Control
															placeholder="Password"
															name="confirmPassword"
															type="password"
															value={confirmPassword}
															onChange={(e) => {
																setConfirmPassword(e.target.value);
																if (equalTo(e.target.value, password)) {
																	setConfirmPasswordState(true);
																} else {
																	setConfirmPasswordState(false);
																}
															}}
														></Form.Control>
														{confirmPasswordState ? null : (
															<label className="error">
																This field is required and needs to be equal with your entered password.
															</label>
														)}
													</Form.Group>
												</Col>
											</Row>
											<div className="card-category form-category">
												<span className="star">*</span>
												Required fields
											</div>
											<br />
											<Button
												className="btn-fill pull-right"
												variant="info"
												onClick={() => {
													updateProfile();
												}}
											>
												Update Profile
											</Button>
										</Card.Body>
									</Collapse>
								</Card>
							</Form>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<Form>
								<Card>
									<Card.Header>
										<Card.Header>
											<Nav>
												<Nav.Item as="h4" className="my-0 py-0">
													<Nav.Link
														data-toggle="collapse"
														aria-expanded={multipleExpandablePanels.includes(2)}
														onClick={(e) => toggleMultipleExpandablePanels(e, 2)}
													>
														<i className="nc-icon nc-paper-2"></i> Your Bets
													</Nav.Link>
												</Nav.Item>
											</Nav>
											<br />
										</Card.Header>
									</Card.Header>
									<Collapse className="collapse" id="collapseTwo" in={multipleExpandablePanels.includes(2)}>
										<Card.Body>Testing</Card.Body>
									</Collapse>
								</Card>
							</Form>
						</Col>
					</Row>
				</Col>
				<Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 2 }}>
					<Card className="card-user">
						<Card.Header className="no-padding">
							<div className="card-image">
								<img alt="..." src={"../static/img/full-screen-image-3.jpg"}></img>
							</div>
						</Card.Header>
						<Card.Body>
							<div className="author">
								<img alt="..." className="avatar border-gray" src={user.image}></img>
								<Card.Title as="h5">{user.name}</Card.Title>
								<p className="card-description">{user.username}</p>
							</div>
							<div className="card-description text-center">Balance</div>
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
	);
}

export default UserPage;

export async function getServerSideProps(context) {
	const { req, res } = context;
	let session = await getSession({ req });

	if (session) {
		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				requester: true,
				accepter: true,
				recipient: true,
			},
		});
		delete user.password;
		user.emailVerified = JSON.stringify(user.emailVerified);
		user.createdAt = JSON.stringify(user.createdAt);
		user.updatedAt = JSON.stringify(user.updatedAt);
		session.user = user;
		return {
			props: { session },
		};
	} else {
		res.writeHead(302, { Location: "/" });
		res.end();
		return { props: {} };
	}
}
