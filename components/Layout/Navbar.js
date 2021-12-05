import { useState } from "react";
import Link from "next/link";
// react-bootstrap components
import { Button, Dropdown, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";

export default function UserNavbar() {
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
						<Button className="btn-wd btn-outline" type="button" variant="info" onClick={() => signIn()}>
							<span className="btn-label mr-2">
								<i className="nc-icon nc-single-02"></i>
							</span>
							Sign In
						</Button>
					)}
				</Container>
			</Navbar>
		</>
	);
}
