import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import { Button, Card, Tab, Form, Nav, Container, Row, Col, Alert } from "react-bootstrap";

// validators
const emailValidation = (value) =>
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
const minLength = (value, length) => value.length >= length;

function LoginRegister({ providers, csrfToken }) {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerEmailState, setRegisterEmailState] = useState(true);
	const [registerMessage, setRegisterMessage] = useState("");
	const [registerMessageState, setRegisterMessageState] = useState(false);
	const [loginEmail, setLoginEmail] = useState("");
	const [loginEmailState, setLoginEmailState] = useState(true);
	const [loginPassword, setLoginPassword] = useState("");
	const [loginPasswordState, setLoginPasswordState] = useState(true);
	const [loginError, setLoginError] = useState("");
	const [loginErrorState, setLoginErrorState] = useState(false);
	const [currentPage, setCurrentPage] = useState("login-page");
	const router = useRouter();

	let signInButtons = Object.values(providers).map((provider, key) => {
		if (provider.name === "Email" || provider.name === "Login") return;
		return (
			<Row key={key}>
				<Col className="text-center">
					<Button className="btn-social" variant={provider.id} onClick={() => signIn(provider.id)}>
						<>
							Sign In with <i className={`fab fa-${provider.id}`}></i>
							{provider.name}
						</>
					</Button>
				</Col>
			</Row>
		);
	});

	let loginButton, registerButton, loginAlert, registerAlert;
	if (loginEmail && loginEmailState && loginPassword && loginPasswordState) {
		loginButton = false;
	} else {
		loginButton = true;
	}
	if (registerEmail && registerEmailState) {
		registerButton = false;
	} else {
		registerButton = true;
	}

	if (loginErrorState) {
		loginAlert = (
			<Alert className="alert-with-icon" variant="danger">
				<button
					aria-hidden={true}
					className="close"
					data-dismiss="alert"
					type="button"
					onClick={() => {
						setLoginErrorState(false);
					}}
				>
					<i className="nc-icon nc-simple-remove"></i>
				</button>
				<span data-notify="icon" className="nc-icon nc-bell-55"></span>
				<span data-notify="message">{loginError}</span>
			</Alert>
		);
	}

	if (registerMessageState) {
		registerAlert = (
			<Alert className="alert-with-icon" variant="info">
				<button
					aria-hidden={true}
					className="close"
					data-dismiss="alert"
					type="button"
					onClick={() => {
						setRegisterMessageState(false);
					}}
				>
					<i className="nc-icon nc-simple-remove"></i>
				</button>
				<span data-notify="icon" className="nc-icon nc-bell-55"></span>
				<span data-notify="message">{registerMessage}</span>
			</Alert>
		);
	}

	useEffect(() => {
		if (router.query.error === "invalidEmail") {
			setLoginErrorState(true);
			setLoginError("Can't find entered email");
		} else if (router.query.error === "incorrectPassword") {
			setLoginErrorState(true);
			setLoginError("Incorrect password entered");
		} else if (router.query.error) {
			setLoginErrorState(true);
			setLoginError(router.query.error);
		} else if (router.query.verifyRequest) {
			setCurrentPage("register-page");
			setRegisterMessageState(true);
			setRegisterMessage("Please check your email to login");
		}
	}, [router]);

	return (
		<Container fluid>
			<Col className="ml-auto mr-auto" md="8">
				<Tab.Container
					id="page-subcategories-tabs-example"
					activeKey={currentPage}
					onSelect={(k) => setCurrentPage(k)}
				>
					<div className="nav-container">
						<Nav role="tablist" variant="tabs" className="justify-content-center border-0 nav-icons">
							<Nav.Item>
								<Nav.Link eventKey="login-page" className="border-0 bg-transparent">
									<i className="nc-icon nc-notes"></i>
									<br></br>
									Login
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="register-page" className="border-0 bg-transparent">
									<i className="nc-icon nc-pin-3"></i>
									<br></br>
									Register
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</div>
					<Tab.Content>
						<Tab.Pane eventKey="login-page">
							<Card>
								<Card.Body>
									<Row>
										<Col>{loginAlert}</Col>
									</Row>
									<Row>
										<Col className="mx-auto" xl={8}>
											<Form id="LoginValidation" method="post" action="/api/auth/callback/credentials">
												<Row>
													<Col>
														<h4 className="text-center">Login Form</h4>
													</Col>
												</Row>

												<Row>
													<Col>
														<Form.Group
															className={"has-label " + (loginEmailState ? "has-success" : "has-error")}
														>
															<Form.Control name="csrfToken" type="hidden" defaultValue={csrfToken} />
															<label>
																Email Address <span className="star">*</span>
															</label>
															<Form.Control
																name="email"
																type="text"
																value={loginEmail}
																onChange={(e) => {
																	setLoginEmail(e.target.value);
																	if (emailValidation(e.target.value)) {
																		setLoginEmailState(true);
																	} else {
																		setLoginEmailState(false);
																	}
																}}
															></Form.Control>
															{loginEmailState ? null : (
																<label className="error">Please enter a email.</label>
															)}
														</Form.Group>
													</Col>
												</Row>

												<Row>
													<Col>
														<Form.Group
															className={"has-label " + (loginPasswordState ? "has-success" : "has-error")}
														>
															<label>
																Password <span className="star">*</span>
															</label>
															<Form.Control
																name="password"
																type="password"
																value={loginPassword}
																onChange={(e) => {
																	setLoginPassword(e.target.value);
																	if (minLength(e.target.value, 1)) {
																		setLoginPasswordState(true);
																	} else {
																		setLoginPasswordState(false);
																	}
																}}
															></Form.Control>
															{loginPasswordState ? null : (
																<label className="error">This field is required.</label>
															)}
														</Form.Group>
													</Col>
												</Row>

												<Row>
													<Col>
														<div className="card-category form-category">
															<span className="star">*</span>
															Required fields
														</div>
													</Col>
												</Row>

												<Row className="mt-4">
													<Col className="text-center">
														<Button
															className="btn-fill btn-wd"
															variant="info"
															type="submit"
															disabled={loginButton}
														>
															Login
														</Button>
													</Col>
												</Row>
											</Form>
											<Row>
												<Col className="text-center">{"OR"}</Col>
											</Row>
											{signInButtons}
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Tab.Pane>

						<Tab.Pane eventKey="register-page">
							<Card>
								<Card.Body>
									<Row>
										<Col>{registerAlert}</Col>
									</Row>
									<Row>
										<Col className="mx-auto" xl={8}>
											<Form id="RegisterValidation" method="post" action="/api/auth/signin/email">
												<Row>
													<Col>
														<h4 className="text-center">Register Form</h4>
													</Col>
												</Row>

												<Row>
													<Col>
														<Form.Group
															className={"has-label " + (registerEmailState ? "has-success" : "has-error")}
														>
															<Form.Control name="csrfToken" type="hidden" defaultValue={csrfToken} />
															<label>
																Email Address <span className="star">*</span>
															</label>
															<Form.Control
																name="email"
																type="email"
																value={registerEmail}
																onChange={(e) => {
																	setRegisterEmail(e.target.value);
																	if (emailValidation(e.target.value)) {
																		setRegisterEmailState(true);
																	} else {
																		setRegisterEmailState(false);
																	}
																}}
															></Form.Control>
															{registerEmailState ? null : (
																<label className="error">This field is required.</label>
															)}
														</Form.Group>
													</Col>
												</Row>

												<Row>
													<Col>
														<div className="card-category form-category">
															<span className="star">*</span>
															Required fields
														</div>
													</Col>
												</Row>

												<Row className="mt-4">
													<Col className="text-center">
														<Button
															className="btn-fill pull-right"
															variant="info"
															type="submit"
															disabled={registerButton}
														>
															Register with Email
														</Button>
													</Col>
													<div className="clearfix"></div>
												</Row>
											</Form>
											<Row>
												<Col className="text-center">{"OR"}</Col>
											</Row>
											{signInButtons}
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</Col>
		</Container>
	);
}

export default LoginRegister;

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });

	// if (session) {
	// 	res.writeHead(302, { Location: "/" });
	// 	res.end();
	// 	return { props: {} };
	// }
	return {
		props: {
			providers: await providers(context),
			csrfToken: await csrfToken(context),
		},
	};
}
