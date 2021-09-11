import React, { useState } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";
import { Badge, Button, Card, Form, InputGroup, Navbar, Nav, Container, Row, Col } from "react-bootstrap";

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
const maxLength = (value, length) => value.length <= length && value !== "";

function UserPage(props) {
	let user = {
		username: "",
		name: "",
		email: "",
		imageUrl: "",
	};
	if (props.session) {
		user = props.session.user;
	}

	const [username, setUsername] = useState(user?.username);
	const [usernameState, setUsernameState] = useState(true);
	const [name, setName] = useState(user?.name);
	const [nameState, setNameState] = useState(true);
	const [email, setEmail] = useState(user?.email);
	const [emailState, setEmailState] = useState(true);
	const [imageURL, setImageURL] = useState(user?.image);
	const [imageURLState, setImageURLState] = useState(true);
	const [password, setPassword] = useState("");
	const [passwordState, setPasswordState] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordState, setConfirmPasswordState] = useState(true);

	console.log("props user", user);

	const updateProfile = () => {
		if (!usernameState || !isRequired(username)) {
			setUsernameState(false);
		} else {
			setUsernameState(true);
		}
		if (!emailState || !emailValidation(email)) {
			setEmailState(false);
		} else {
			setEmailState(true);
		}
		if (!passwordState || !minLength(password, 1)) {
			setPasswordState(false);
		} else {
			setPasswordState(true);
		}
		if (!confirmPasswordState || !minLength(confirmPassword, 1) || !equalTo(confirmPassword, password)) {
			setConfirmPasswordState(false);
		} else {
			setConfirmPasswordState(true);
		}

		if (usernameState && emailState && passwordState && confirmPasswordState) {
			let updatedUser = {
				username,
				name,
				email,
				password,
			};
			axios.post("http://localhost:4000/api/user", updatedUser);
		}
	};

	return (
		<Container>
			<Row>
				<Col md="8" sm="6">
					<Form onSubmit={updateProfile}>
						<Card>
							<Card.Header>
								<Card.Header>
									<Card.Title as="h4">Edit Profile</Card.Title>
								</Card.Header>
							</Card.Header>
							<Card.Body>
								<Row>
									<Col className="pr-1">
										<Form.Group className={"has-label " + (usernameState ? "has-success" : "has-error")}>
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
									<Col className="p1-1">
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
										<Form.Group className={"has-label " + (imageURLState ? "has-success" : "has-error")}>
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
								<Row>
									<Col className="pr-1">
										<Form.Group className={"has-label " + (passwordState ? "has-success" : "has-error")}>
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
									<Col className="p1-1">
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
								<img alt="..." src={"../static/img/full-screen-image-3.jpg"}></img>
							</div>
						</Card.Header>
						<Card.Body>
							<div className="author">
								<img alt="..." className="avatar border-gray" src={"../static/img/faces/face-0.jpg"}></img>
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
	const session = await getSession({ req });

	if (session && res && session.accessToken) {
		return {
			props: { session },
		};
	} else {
		res.writeHead(302, { Location: "/" });
		res.end();
		return { props: {} };
	}
}
