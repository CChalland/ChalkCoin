import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function GameLeader(props) {
	const leadersHelper = (athlete, sportName) => {
		let title, player, rowStyle;

		if (sportName === "MLB") {
			if (athlete && !athlete.displayValue && athlete.statistics?.length > 0) {
				let wins = athlete.statistics.filter((stat) => {
					return stat.name === "wins";
				});
				let losses = athlete.statistics.filter((stat) => {
					return stat.name === "losses";
				});
				let era = athlete.statistics.filter((stat) => {
					return stat.name === "ERA";
				});
				athlete.displayValue = `(${wins[0].displayValue}-${losses[0].displayValue}, ${era[0].displayValue})`;
			}

			if (athlete && athlete.type === "pre") {
				title = <Row className="mt-2 py-1 text-secondary h6">{"PROBABLE PITCHERS"}</Row>;
				rowStyle = "mb-3 align-items-center";
				player = (
					<>
						<Col xs="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col xs="auto">
							<Row className="mb-0">
								<Col xs="auto" className="px-0">
									{athlete.displayName}
								</Col>
								<Col xs="auto" className="px-2 text-secondary">
									{athlete.team}
								</Col>
							</Row>
							<Row className="mb-0 text-secondary">{athlete.displayValue}</Row>
						</Col>
					</>
				);
			} else if (athlete && athlete.type === "dueUp") {
				title = (
					<Row className="mt-2 py-1 text-secondary h6">{`DUE UP FOR ${athlete.team.toUpperCase()}`}</Row>
				);
				rowStyle = "mb-2 align-items-center";
				player = (
					<>
						<Col xs="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col xs="auto">
							<Row className="mb-0 h6">{athlete.displayName}</Row>
							<Row className="mb-0 text-secondary">{athlete.displayValue}</Row>
						</Col>
					</>
				);
			} else if (athlete && athlete.type === "in") {
				player = (
					<Col xs={12} md={6} lg={12} xl={12}>
						<Row className="mt-2 py-1 text-secondary">{athlete.title}</Row>
						<Row className="mb-0 align-items-center">
							<Col xs="auto">
								<Image width={45} height={40} src={athlete.headshot} roundedCircle />
							</Col>
							<Col xs="auto">
								<Row className="mb-0 h6">{athlete.displayName}</Row>
								<Row className="mb-0 text-secondary">{athlete.displayValue}</Row>
							</Col>
						</Row>
					</Col>
				);
			} else if (athlete && athlete.type === "completed") {
				rowStyle = "mt-2 mb-1 align-items-center";
				player = (
					<>
						<Col xs={3} className="pl-0">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col xs={6} className="pl-0">
							<Row className="mb-0 text-secondary">{athlete.title}</Row>
							<Row className="mb-0 h6">{athlete.displayName}</Row>
						</Col>
						<Col className="mx-0 px-0 text-secondary">{athlete.displayValue}</Col>
					</>
				);
			} else {
				title = <Row className="mt-2 py-1 text-secondary h6">{"PROBABLE PITCHERS"}</Row>;
				rowStyle = "mb-3 align-items-center";
				player = (
					<>
						<Col md="auto">
							<Image width={45} height={40} src={null} roundedCircle />
						</Col>
						<Col md="auto">{"Undecided"}</Col>
					</>
				);
			}
		} else if (athlete && sportName === "NHL") {
			if (!athlete.displayValue && athlete.position === "G") {
				let saves = athlete.statistics.filter((stat) => {
					return stat.name === "saves";
				});
				let savesPrecent = athlete.statistics.filter((stat) => {
					return stat.name === "savePct";
				});
				// athlete.displayValue = `${saves[0].displayValue} SV. ${savesPrecent[0].displayValue}`;
				athlete.displayValue = (
					<p>
						<strong>{saves[0].displayValue}</strong> SV, <strong>{savesPrecent[0].displayValue}</strong> SV%
					</p>
				);
			} else if (!athlete.displayValue) {
				let goals = athlete.statistics.filter((stat) => {
					return stat.name === "goals";
				});
				let assists = athlete.statistics.filter((stat) => {
					return stat.name === "assists";
				});
				let plusMinus = athlete.statistics.filter((stat) => {
					return stat.name === "plusMinus";
				});
				// athlete.displayValue = `${goals[0].displayValue} G, ${assists[0].displayValue} A, ${plusMinus[0].displayValue}`;
				athlete.displayValue = (
					<p>
						<strong>{goals[0].displayValue}</strong> G, <strong>{assists[0].displayValue}</strong> A,{" "}
						<strong>+{plusMinus[0].displayValue}</strong>
					</p>
				);
			}

			if (athlete.type === "pre" || athlete.type === "in") {
				const filler = athlete.type === "pre" ? "PTS" : null;
				title = <Row className="mt-2 py-1 text-secondary">{athlete.title}</Row>;
				player = (
					<Row className="mb-3 align-items-center">
						<Col md="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="mb-0 h6">
								<Col md="auto" className="px-0">
									{athlete.displayName}
								</Col>
								<Col md="auto" className="px-2 text-secondary">{`${athlete.position} - ${athlete.team}`}</Col>
							</Row>
							<Row className="mb-0 text-secondary">{`${athlete.displayValue} ${filler}`}</Row>
						</Col>
					</Row>
				);
			} else if (athlete.type === "completed") {
				const stars = {
					first: <span className="Athlete__Star"></span>,
					second: (
						<>
							<span className="Athlete__Star"></span>
							<span className="Athlete__Star"></span>
						</>
					),
					third: (
						<>
							<span className="Athlete__Star"></span>
							<span className="Athlete__Star"></span>
							<span className="Athlete__Star"></span>
						</>
					),
				};

				player = (
					<Row className="my-3 align-items-center">
						<Col className="mx-0 px-0" sm="auto">
							{stars[athlete.title.split(" ")[0].toLowerCase()]}
						</Col>
						<Col sm="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col md="auto">
							<Row className="mb-0 h6">
								<Col md="auto" className="px-0">
									{athlete.displayName}
								</Col>
								<Col md="auto" className="px-2 text-secondary">{`${athlete.position} - ${athlete.team}`}</Col>
							</Row>
							<Row className="mb-0 text-secondary">{athlete.displayValue}</Row>
						</Col>
					</Row>
				);
			}
		} else if (athlete && sportName === "NFL") {
			if (athlete.type === "pre") {
				const divider = athlete.team.side === "away" ? <Row className="border"></Row> : null;
				title = <Row className="mt-2 text-secondary">{athlete.title}</Row>;
				player = (
					<>
						<Col xs={12} md={6} lg={12} xl={12}>
							<Row className="mt-3 mb-1 h6">{athlete.team.name}</Row>
							<Row className="mt-1 mb-2">
								{athlete.team.links.map((link, key) => {
									return (
										<Col xs="auto" key={key} className="mx-0 px-1 text-center">
											<a href={link.href} target="_blank">
												{link.text}
											</a>
										</Col>
									);
								})}
							</Row>
						</Col>
						{divider}
					</>
				);
			} else {
				title = <Row className="mt-2 text-secondary">{athlete.title}</Row>;
				rowStyle = "my-1 align-items-center";
				player = (
					<>
						<Col xs={3} className="text-secondary">
							{athlete.position}
						</Col>
						<Col xs={9} className="border-left">
							<Row>
								<Col xs="auto" className="mx-0 font-weight-bold">
									{athlete.displayName}
								</Col>
								<Col xs="auto" className="px-0 text-secondary">
									{athlete.team}
								</Col>
							</Row>
							<Row>
								<Col className="text-secondary">{athlete.displayValue}</Col>
							</Row>
						</Col>
					</>
				);
			}
		} else if (athlete) {
			if (athlete.type === "pre" || athlete.type === "in" || athlete.type === "completed") {
				let playerStats = athlete.displayValue.split(",");
				title = <Row className="mt-2 py-1 text-secondary">{athlete.title}</Row>;
				rowStyle = "mb-2 align-items-center";
				player = (
					<>
						<Col xs="auto">
							<Image width={45} height={40} src={athlete.headshot} roundedCircle />
						</Col>
						<Col xs="auto">
							<Row className="mb-0 h6">{athlete.displayName}</Row>
							<Row className="mb-0 text-secondary">{`${athlete.team} - ${athlete.position}`}</Row>
							<Row className="mb-0 text-secondary">{`${playerStats[0]},${playerStats[1]},${playerStats[2]}`}</Row>
						</Col>
					</>
				);
			}
		}
		return { title, player, rowStyle };
	};

	const { gameLeadersData, sportName } = props;
	let gameTitle;

	let athletes = gameLeadersData.athletes?.map((athlete) => {
		// console.log(athlete);
		const { title, player, rowStyle } = leadersHelper(athlete, sportName);
		gameTitle = title;

		return <Row className={rowStyle}>{player}</Row>;
	});

	return (
		<Container fluid>
			{gameTitle}
			{athletes}
		</Container>
	);
}

export default GameLeader;
