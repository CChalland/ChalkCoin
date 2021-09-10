import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Row, Button, Modal, Carousel, Tab, Nav, Card } from "react-bootstrap";
import Select from "react-select";
import prisma from "../contexts/prisma";

function Test(props) {
	const options = [
		"Inside Out",
		"John Wick",
		"Jurassic World",
		"The Lord of the Rings",
		"Pacific Rim",
		"Pirates of the Caribbean",
		"Planet of the Apes",
		"Saw",
		"Sicario",
		"Zombies",
	];

	const [results, setResults] = useState(options);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [singleSelect, setSingleSelect] = React.useState("");

	const filterMethod = (options, query) => {
		return options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));
	};

	const searchList = (event) => {
		const results = filterMethod(options, event.target.value);
		setResults(results);
	};

	const showDropdown = () => {
		setDropdownVisible(true);
	};

	const hideDropdown = () => {
		setDropdownVisible(false);
	};

	console.log(props.users);
	return (
		<Container>
			<div className="autocomplete">
				<input
					type="text"
					placeholder="Type to search list"
					onChange={searchList}
					onFocus={() => showDropdown()}
					onBlur={() => hideDropdown()}
				/>
				{dropdownVisible && (
					<div className="autocomplete-dropdown">
						<ul className="autocomplete-search-results-list">
							{results.map((result) => (
								<li className="autocomplete-search-result" key={result}>
									{result}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<Select
				className="react-select primary"
				classNamePrefix="react-select"
				name="singleSelect"
				value={singleSelect}
				onChange={(value) => setSingleSelect(value)}
				options={[
					{
						value: "",
						label: "Single Option",
						isDisabled: true,
					},
					{ value: "2", label: "Foobar" },
					{ value: "3", label: "Is great" },
				]}
				placeholder="Search Username"
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
