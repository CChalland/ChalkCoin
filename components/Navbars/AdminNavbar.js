// react-bootstrap components
import { Button, Dropdown, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

function AdminNavbar() {
	const [session, loading] = useSession();
	const [collapseOpen, setCollapseOpen] = useState(false);

	return (
		<>
			<Navbar expand="lg">
				<Container fluid>
					<div className="navbar-wrapper">
						<div className="navbar-minimize">
							<Button
								className="btn-fill btn-round btn-icon d-none d-lg-block bg-dark border-dark"
								variant="dark"
								onClick={() => document.body.classList.toggle("sidebar-mini")}
							>
								<i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
								<i className="fas fa-bars visible-on-sidebar-mini"></i>
							</Button>
							<Button
								className="btn-fill btn-round btn-icon d-block d-lg-none bg-dark border-dark"
								variant="dark"
								onClick={() => document.documentElement.classList.toggle("nav-open")}
							>
								<i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
								<i className="fas fa-bars visible-on-sidebar-mini"></i>
							</Button>
						</div>
					</div>
					{session ? (
						<button
							className="navbar-toggler navbar-toggler-right border-0"
							type="button"
							onClick={() => setCollapseOpen(!collapseOpen)}
						>
							<span className="navbar-toggler-bar burger-lines"></span>
							<span className="navbar-toggler-bar burger-lines"></span>
							<span className="navbar-toggler-bar burger-lines"></span>
						</button>
					) : (
						<Button
							className="d-block d-lg-none btn-wd btn-outline"
							type="button"
							variant="info"
							onClick={() => signIn()}
						>
							<span className="btn-label mr-2">
								<i className="nc-icon nc-single-02"></i>
							</span>
							Sign In
						</Button>
					)}

					<Navbar.Collapse className="justify-content-end" in={collapseOpen}>
						<Row>
							{/* For full nav */}
							<Col className="d-none d-lg-block">
								{session ? (
									<Nav navbar>
										<Dropdown as={Nav.Item}>
											<Dropdown.Toggle as={Nav.Link} id="dropdown-41471887333" variant="default">
												<i className="nc-icon nc-bullet-list-67"></i>
											</Dropdown.Toggle>
											<Dropdown.Menu alignRight aria-labelledby="navbarDropdownMenuLink">
												<Dropdown.Item>
													<Link href="/user">
														<span>
															<i className="nc-icon nc-settings-90"></i>
															Settings
														</span>
													</Link>
												</Dropdown.Item>

												<div className="divider"></div>

												<Dropdown.Item className="text-danger" onClick={() => signOut()}>
													<i className="nc-icon nc-button-power"></i>
													Log out
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</Nav>
								) : (
									<Button
										className="btn-wd btn-outline"
										type="button"
										variant="info"
										onClick={() => signIn()}
									>
										<span className="btn-label mr-2">
											<i className="nc-icon nc-single-02"></i>
										</span>
										Sign In
									</Button>
								)}
							</Col>

							{/* For mini nav */}
							<Col className="d-block d-lg-none">
								<Row className="">
									<Col className="text-right">
										<Link href="/user">
											<Button
												className="btn-wd btn-outline"
												type="button"
												variant="default"
												onClick={() => setCollapseOpen(!collapseOpen)}
											>
												<i className="nc-icon nc-settings-90 mr-2"></i>
												Settings
											</Button>
										</Link>
									</Col>
								</Row>
								<Row>
									<Col className="text-right">
										<Button
											className="btn-wd btn-outline"
											type="button"
											variant="danger"
											onClick={() => signOut()}
										>
											<span className="btn-label mr-2">
												<i className="nc-icon nc-button-power"></i>
											</span>
											Log out
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default AdminNavbar;
