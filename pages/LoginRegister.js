import React from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import { Button, Card, Tab, Form, Nav, Container, Row, Col } from "react-bootstrap";

// validators
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
const equalTo = (value1, value2) => value1 === value2;
const isRequired = (value) => value !== null && value !== "" && value;
const isNumber = (value) => !isNaN(value) && value !== "";
const minLength = (value, length) => value.length >= length;
const maxLength = (value, length) => value.length <= length && value !== "";
const range = (value, min, max) => min <= value && value <= max;
const minValue = (value, min) => min <= value;
const maxValue = (value, max) => max >= value;

function LoginRegister({ providers, csrfToken }) {
	const [registerEmail, setRegisterEmail] = React.useState("");
	const [registerEmailState, setRegisterEmailState] = React.useState(true);
	const [registerPassword, setRegisterPassword] = React.useState("");
	const [registerPasswordState, setRegisterPasswordState] = React.useState(true);
	const [registerConfirmPassword, setRegisterConfirmPassword] = React.useState("");
	const [registerConfirmPasswordState, setRegisterConfirmPasswordState] = React.useState(true);
	const [loginEmail, setLoginEmail] = React.useState("");
	const [loginEmailState, setLoginEmailState] = React.useState(true);
	const [loginPassword, setLoginPassword] = React.useState("");
	const [loginPasswordState, setLoginPasswordState] = React.useState(true);

	let signInButtons = Object.values(providers).map((provider) => {
		if (provider.name === "Email" || provider.name === "Login") return;
		return (
			<Button className="btn-social" variant={provider.id} onClick={() => signIn(provider.id)}>
				<>
					Sign In with <i className={`fab fa-${provider.id}`}></i>
					{provider.name}
				</>
			</Button>
		);
	});

	return (
		<>
			<Container fluid>
				<Col className="ml-auto mr-auto" md="8">
					<Tab.Container id="page-subcategories-tabs-example" defaultActiveKey="login-page">
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
									<Card.Header className="text-center">
										<Card.Title as="h4">Login</Card.Title>
										<p className="card-category">More information here</p>
									</Card.Header>
									<Card.Body>
										<Col className="mx-auto" md="6">
											<Row>
												<Form id="LoginValidation" method="post" action="/api/auth/callback/credentials">
													<Card>
														<Card.Header>
															<Card.Title as="h4" className="text-center">
																Login Form
															</Card.Title>
														</Card.Header>
														<Card.Body>
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
																	<label className="error">This field is required.</label>
																)}
															</Form.Group>
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
															<div className="card-category form-category">
																<span className="star">*</span>
																Required fields
															</div>
														</Card.Body>
														<Card.Footer className="text-center">
															<Button
																className="btn-fill btn-wd"
																variant="info"
																type="submit"
																// onClick={() => {
																// 	if (!loginEmailState || !emailValidation(loginEmail)) {
																// 		setLoginEmailState(false);
																// 	} else {
																// 		setLoginEmailState(true);
																// 	}
																// 	if (!loginPasswordState || !minLength(loginPassword, 1)) {
																// 		setLoginPasswordState(false);
																// 	} else {
																// 		setLoginPasswordState(true);
																// 	}
																// }}
															>
																Login
															</Button>
														</Card.Footer>
													</Card>
												</Form>
											</Row>
											<Row>{signInButtons}</Row>
										</Col>
									</Card.Body>
								</Card>
							</Tab.Pane>
							<Tab.Pane eventKey="register-page">
								<Card>
									<Card.Header className="text-center">
										<Card.Title as="h4">Register</Card.Title>
										<p className="category">Here is some text</p>
									</Card.Header>
									<Card.Body>
										<Col className="mx-auto" md="6">
											<Row>
												<Form action="/api/auth/signin/email" id="RegisterValidation" method="post">
													<Card>
														<Card.Header className="text-center">
															<Card.Title as="h4">Register Form</Card.Title>
														</Card.Header>
														<Card.Body>
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
															<div className="card-category form-category">
																<span className="star">*</span>
																Required fields
															</div>
														</Card.Body>
														<Card.Footer className="text-center">
															<Button className="btn-fill pull-right" variant="info" type="submit">
																Register with Email
															</Button>
															<div className="clearfix"></div>
														</Card.Footer>
													</Card>
												</Form>
											</Row>
											<Row>{signInButtons}</Row>
										</Col>
									</Card.Body>
								</Card>
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>
				</Col>
				{/* end col-md-8 */}
			</Container>
		</>
	);
}

export default LoginRegister;

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });

	if (session && res && session.accessToken) {
		res.writeHead(302, { Location: "/" });
		res.end();
		return { props: {} };
	}
	return {
		props: {
			providers: await providers(context),
			csrfToken: await csrfToken(context),
		},
	};
}
