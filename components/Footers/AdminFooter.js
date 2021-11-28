import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/scss/betoken-bootstrap-react.scss?v=2.0.0";
import "../../assets/css/Custom.css";
import React from "react";

// react-bootstrap components
import {
	Badge,
	Button,
	ButtonGroup,
	Card,
	Form,
	InputGroup,
	Navbar,
	Nav,
	Pagination,
	Container,
	Row,
	Col,
} from "react-bootstrap";

function AdminFooter() {
	return (
		<>
			<footer className="footer">
				<Container fluid className="pl-4 ml-2">
					<nav>
						<ul className="footer-menu">
							<li>
								<a href="#pablo" onClick={(e) => e.preventDefault()}>
									Home
								</a>
							</li>
							<li>
								<a href="#pablo" onClick={(e) => e.preventDefault()}>
									Disclaimer
								</a>
							</li>
							<li>
								<a href="#pablo" onClick={(e) => e.preventDefault()}>
									Portfolio
								</a>
							</li>
						</ul>
						<p className="copyright text-center">
							© <script>document.write(new Date().getFullYear())</script>
							<a href="http://www.colechalland.com">Cole Challand</a>, made with love for a better web
						</p>
					</nav>
				</Container>
			</footer>
		</>
	);
}

export default AdminFooter;
