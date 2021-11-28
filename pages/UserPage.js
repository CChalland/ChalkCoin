import React, { useState, useEffect, useContext } from "react";
import { Alert, Button, Card, Form, Collapse, Nav, Container, Row, Col, Tab } from "react-bootstrap";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { BetContext } from "../contexts/Bets.Context";
import BetsTabs from "../components/User/BetsTabs";
import axios from "axios";
import prisma from "../contexts/prisma";
// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/betoken-bootstrap-react.scss?v=2.0.0";
import "assets/css/Custom.css";

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

function UserPage({ session }) {
	const bets = useContext(BetContext);
	const [userBets, setUserBets] = useState([]);
	const [user, setUser] = useState({
		username: session.user.username ? session.user.username : "",
		name: session.user.name ? session.user.name : "",
		email: session.user.email ? session.user.email : "",
		image: session.user.image ? session.user.image : "../static/img/faces/face-0.jpg",
	});
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
	const router = useRouter();
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
			let response = await axios.post(`/api/currentUser`, updatedUser);
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
	useEffect(() => {
		if (router.query.newUser) {
			setNewUserState(true);
			if (!user.username) setUsernameState(false);
			if (!user.email) setEmailState(false);
			setPasswordState(false);
			setConfirmPasswordState(false);
		}
	}, [router]);

	useEffect(() => {
		let userBetsData = [];
		if (bets.userBets.pendingBets?.recipientBets.length)
			userBetsData.push({ type: "Received", bets: bets.userBets.pendingBets?.recipientBets });
		if (bets.userBets.pendingBets?.openBets.length)
			userBetsData.push({ type: "Open", bets: bets.userBets.pendingBets?.openBets });
		if (bets.userBets.acceptedBets?.length)
			userBetsData.push({ type: "Accepted", bets: bets.userBets.acceptedBets });
		if (bets.userBets.completedBets?.length)
			userBetsData.push({ type: "Completed", bets: bets.userBets.completedBets });

		setUserBets(userBetsData);
	}, [bets.userBets]);

	// console.log("UserPage bets", bets);
	// console.log("UserPage session", session);

	return (
		<Container fluid>
			<Row>
				<Col className="">
					<Tab.Container defaultActiveKey="user-page-bets">
						<div className="nav-container">
							<Nav role="tablist" variant="tabs" className="justify-content-start border-0 nav-icons">
								<Nav.Item>
									<Nav.Link eventKey="user-page-settings" className="border-0 bg-transparent">
										<i className="nc-icon nc-preferences-circle-rotate"></i>
										<br></br>
										Edit Profile
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="user-page-bets" className="border-0 bg-transparent">
										<i className="nc-icon nc-paper-2"></i>
										<br></br>
										Your Bets
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</div>
						<Tab.Content>
							<Tab.Pane eventKey="user-page-settings">
								<Row>
									{/* Edit User Col */}
									<Col
									// xs={{ span: 12, order: 2 }}
									// md={{ span: 8, order: 1 }}
									// lg={{ span: 9, order: 2 }}
									// xl={{ span: 9, order: 1 }}
									>
										<Card>
											<Card.Header>
												<Card.Title as="h4">
													<i className="nc-icon nc-preferences-circle-rotate"></i> Edit Profile
												</Card.Title>
											</Card.Header>
											{newUserAlert}
											{updateErrorAlert}
											{updateSuccessAlert}
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
															{usernameState ? null : (
																<label className="error">This field is required.</label>
															)}
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
															{passwordState ? null : (
																<label className="error">This field is required.</label>
															)}
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
										</Card>
									</Col>

									{/* For User Card */}
									{/* <Col
										xs={{ span: 12, order: 1 }}
										// md={{ span: 4, order: 2 }}
										lg={{ span: 12, order: 1 }}
										xl={{ span: 3, order: 2 }}
										// className="d-none d-xl-block"
									>
										<Card className="card-user">
											<Card.Header className="no-padding">
												<div className="card-image">
													<img alt="..." src={"../static/img/full-screen-image-3.jpg"}></img>
												</div>
											</Card.Header>
											<Card.Body>
												<div className="author">
													<img alt="..." className="avatar border-gray" src={user.image}></img>
													<Card.Title as="h3">{user.name || user.username}</Card.Title>
												</div>
												<div className="card-description">
													<Row>
														<Col>Testing</Col>
													</Row>
													<Row>
														<Col>Testing2</Col>
													</Row>
												</div>
											</Card.Body>
											
										</Card>
									</Col> */}
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="user-page-bets">
								<BetsTabs userBets={userBets} currentUser={session.user} />
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>
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
				requester: { select: { id: true } },
				accepter: { select: { id: true } },
				recipient: { select: { id: true } },
				winner: { select: { id: true } },
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
