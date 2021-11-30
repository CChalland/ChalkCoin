import { useState } from "react";
import { Container, Row, Col, Card, Collapse } from "react-bootstrap";

export default function FaqSection() {
	const [collapsibleAccordion, setCollapsibleAccordion] = useState(-1);
	const data = [
		{
			id: 1,
			expend: true,
			title: "How to contact with Customer Service?",
			description:
				"Our Customer Experience Team is available 7 days a week. We try to reply quickly, so you need not to wait too long for a response!.",
		},
		{
			id: 2,
			title: "App installation failed, how to update system information?",
			description:
				"Please read the documentation carefully. If the problem remains, Please Open a ticket in the support forum. ",
		},
		{
			id: 3,
			title: "Website reponse taking time, how to improve?",
			description:
				"At first, Please check your internet connection. If the problem remains, Please Open a ticket in the support forum.",
		},
		{
			id: 4,
			title: "New update fixed all bug and issues?",
			description:
				"We are giving the update of this theme continuously. You will receive an email Notification when we push an update. Always try to be updated with us.",
		},
	];

	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={"auto"}>
					<h1>Have Any Question?</h1>
				</Col>
			</Row>
			<Row className="justify-content-center mb-3">
				<Col xs={"auto"}>
					<div className="card-category form-category text-secondary">
						<span className="star">* </span>
						Please keep in mind that this is a personal project and has no company backing it.
					</div>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col>
					<Card>
						<Card.Body>
							<div className="accordions" id="accordion">
								{data.map((item) => {
									return (
										<Card key={item.id}>
											<Card.Header>
												<Card.Title as="h4">
													<a
														aria-expanded={collapsibleAccordion === item.id}
														data-toggle="collapse"
														href="#pablo"
														onClick={(e) => {
															e.preventDefault();
															collapsibleAccordion === item.id
																? setCollapsibleAccordion(-1)
																: setCollapsibleAccordion(item.id);
														}}
													>
														{item.title} <b className="caret"></b>
													</a>
												</Card.Title>
											</Card.Header>
											<Collapse
												className="card-collapse"
												id={`collapse${item.id}Hover`}
												in={collapsibleAccordion === item.id}
											>
												<Card.Body>{item.description}</Card.Body>
											</Collapse>
										</Card>
									);
								})}
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
