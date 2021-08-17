import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
// import PropTypes from "prop-types";

// react-bootstrap components
import {
	Badge,
	Button,
	ButtonGroup,
	Card,
	Collapse,
	Form,
	InputGroup,
	Navbar,
	Nav,
	Pagination,
	Container,
	Row,
	Col,
	Image,
} from "react-bootstrap";

function Sidebar({ routes, image, background, pathname }) {
	// // to check for active links and opened collapses
	// const router = useRouter();
	// let location = router.asPath;
	// this is for the user collapse
	const [userCollapseState, setUserCollapseState] = useState(false);
	// this is for the rest of the collapses
	const [state, setState] = useState({});
	useEffect(() => {
		setState(getCollapseStates(routes));
	}, []);
	// this creates the intial state of this component based on the collapse routes
	// that it gets through routes prop
	const getCollapseStates = (routes) => {
		let initialState = {};
		routes.map((prop, key) => {
			if (prop.collapse) {
				initialState = {
					[prop.state]: getCollapseInitialState(prop.views),
					...getCollapseStates(prop.views),
					...initialState,
				};
			}
			return null;
		});
		return initialState;
	};
	// this verifies if any of the collapses should be default opened on a rerender of this component
	// for example, on the refresh of the page,
	// while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
	const getCollapseInitialState = (routes) => {
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
				return true;
			} else if (pathname === routes[i].path) {
				return true;
			}
		}
		return false;
	};
	// this function creates the links and collapses that appear in the sidebar (left menu)
	const createLinks = (routes) => {
		return routes.map((prop, key) => {
			if (prop.redirect) {
				return null;
			}
			if (prop.collapse) {
				var st = {};
				st[prop["state"]] = !state[prop.state];
				return (
					<Nav.Item className={getCollapseInitialState(prop.views) ? "active" : ""} as="li" key={key}>
						<Nav.Link
							className={state[prop.state] ? "collapsed" : ""}
							data-toggle="collapse"
							onClick={(e) => {
								e.preventDefault();
								setState({ ...state, ...st });
							}}
							aria-expanded={state[prop.state]}
						>
							<i className={prop.icon}></i>
							<p>
								{prop.name} <b className="caret"></b>
							</p>
						</Nav.Link>
						<Collapse in={prop.path === "/games" ? !state[prop.state] : state[prop.state]}>
							<div>
								<Nav as="ul">{createLinks(prop.views)}</Nav>
							</div>
						</Collapse>
					</Nav.Item>
				);
			}
			return (
				<Nav.Item className={activeRoute(prop.path)} key={key} as="li">
					<Link href={prop.path} passHref>
						<Nav.Link>{navLinkTitle(prop)}</Nav.Link>
					</Link>
				</Nav.Item>
			);
		});
	};
	const navLinkTitle = (prop) => {
		if (prop.path.includes("/games?")) {
			return (
				<Container fluid>
					<Row className="align-items-center">
						<Col xs={4}>
							<Image src={prop.icon} fluid />
						</Col>
						<Col>
							<p>{prop.name}</p>
						</Col>
					</Row>
				</Container>
			);
		} else if (prop.icon) {
			return (
				<>
					<i className={prop.icon} />
					<p>{prop.name}</p>
				</>
			);
		} else {
			return (
				<>
					<span className="sidebar-mini">{prop.mini}</span>
					<span className="sidebar-normal">{prop.name}</span>
				</>
			);
		}
	};
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return pathname === routeName ? "active" : "";
	};
	return (
		<>
			<div className="sidebar" data-color={background} data-image={image}>
				<div className="sidebar-wrapper">
					<div className="logo">
						<a className="simple-text logo-mini" href="/">
							<div className="logo-img">{/* <img src="" alt="react-logo" /> */}</div>
						</a>
						<a className="simple-text logo-normal" href="/">
							BEToken
						</a>
					</div>
					<div className="user">
						<div className="photo">
							<img alt="..." src=""></img>
						</div>
						<div className="info">
							<a
								className={userCollapseState ? "collapsed" : ""}
								data-toggle="collapse"
								href="#pablo"
								onClick={(e) => {
									e.preventDefault();
									setUserCollapseState(!userCollapseState);
								}}
								aria-expanded={userCollapseState}
							>
								<span>
									Cole <b className="caret"></b>
								</span>
							</a>
							<Collapse id="collapseExample" in={userCollapseState}>
								<div>
									<Nav as="ul">
										<li>
											<a className="profile-dropdown" href="#pablo" onClick={(e) => e.preventDefault()}>
												<span className="sidebar-mini">MP</span>
												<span className="sidebar-normal">My Profile</span>
											</a>
										</li>
										<li>
											<a className="profile-dropdown" href="#pablo" onClick={(e) => e.preventDefault()}>
												<span className="sidebar-mini">EP</span>
												<span className="sidebar-normal">Edit Profile</span>
											</a>
										</li>
										<li>
											<a className="profile-dropdown" href="#pablo" onClick={(e) => e.preventDefault()}>
												<span className="sidebar-mini">S</span>
												<span className="sidebar-normal">Settings</span>
											</a>
										</li>
									</Nav>
								</div>
							</Collapse>
						</div>
					</div>
					<Nav as="ul">{createLinks(routes)}</Nav>
				</div>
				<div
					className="sidebar-background"
					style={{
						backgroundImage: "url('" + image + "')",
					}}
				></div>
			</div>
		</>
	);
}

Sidebar.getInitialProps = async ({ pathname }) => {
	return pathname;
};

// let linkPropTypes = {
// 	path: PropTypes.string,
// 	layout: PropTypes.string,
// 	name: PropTypes.string,
// 	component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
// };

// Sidebar.defaultProps = {
// 	image: "",
// 	background: "black",
// 	routes: [],
// };

// Sidebar.propTypes = {
// 	image: PropTypes.string,
// 	background: PropTypes.oneOf(["black", "azure", "green", "orange", "red", "purple"]),
// 	routes: PropTypes.arrayOf(
// 		PropTypes.oneOfType([
// 			PropTypes.shape({
// 				...linkPropTypes,
// 				icon: PropTypes.string,
// 			}),
// 			PropTypes.shape({
// 				collapse: true,
// 				path: PropTypes.string,
// 				name: PropTypes.string,
// 				state: PropTypes.string,
// 				icon: PropTypes.string,
// 				views: PropTypes.shape({
// 					...linkPropTypes,
// 					mini: PropTypes.string,
// 				}),
// 			}),
// 		])
// 	),
// };

export default Sidebar;
