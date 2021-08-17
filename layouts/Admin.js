import React, { useState } from "react";
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

// core components
import Sidebar from "../components/Sidebar/Sidebar.js";
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";

// dinamically create dashboard routes
import routes from "./routes.js";

// import image from "../assets/img/full-screen-image-3.jpg";

function Admin(props) {
	const [sidebarImage, setSidebarImage] = useState("");
	const [sidebarBackground, setSidebarBackground] = useState("black");
	// const getRoutes = (routes) => {
	// 	return routes.map((prop, key) => {
	// 		if (prop.collapse) {
	// 			return getRoutes(prop.views);
	// 		}
	// 		if (prop.layout === "/admin") {
	// 			return <Route path={prop.layout + prop.path} key={key} component={prop.component} />;
	// 		} else {
	// 			return null;
	// 		}
	// 	});
	// };
	return (
		<>
			<div className="wrapper">
				<Sidebar routes={routes} image={sidebarImage} background={sidebarBackground} />
				<div className="main-panel">
					<AdminNavbar />
					<div className="content">{props.children}</div>
					<AdminFooter />
					<div
						className="close-layer"
						onClick={() => document.documentElement.classList.toggle("nav-open")}
					/>
				</div>
			</div>
		</>
	);
}

export default Admin;
