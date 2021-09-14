import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Row, Image, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import Select, { components } from "react-select";
import prisma from "../contexts/prisma";

function Test(props) {
	const [singleSelect, setSingleSelect] = useState("");
	const IconOption = (props) => (
		<components.Option {...props}>
			<Row className="align-items-center">
				<Col xs="auto">
					<Image width={35} height={35} src={props.data.image} roundedCircle />
				</Col>
				<Col>
					<Row>{props.data.value}</Row>
					<Row className="text-muted">
						<small>{props.data.label}</small>
					</Row>
				</Col>
			</Row>
		</components.Option>
	);

	const optionsUsers = props.users.map((user) => {
		return {
			value: user.username,
			image: user.image,
			label: user.name,
		};
	});

	console.log(props.users);
	return (
		<Container>
			<Select
				className="react-select primary"
				classNamePrefix="react-select"
				name="singleSelect"
				value={singleSelect}
				onChange={(value) => setSingleSelect(value)}
				options={optionsUsers}
				placeholder="Search Username"
				components={{ Option: IconOption }}
			/>
		</Container>
	);
}

export default Test;

export async function getServerSideProps(context) {
	let users = await prisma.user.findMany();
	users = users.map((user) => {
		delete user.emailVerified;
		delete user.createdAt;
		delete user.updatedAt;

		return user;
	});

	return {
		props: { users },
	};
}
