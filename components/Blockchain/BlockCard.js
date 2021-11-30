import { useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { BlockchainDispatch } from "../../contexts/Blockchain.Context";
import { EventsFinder } from "../../helpers/EventsHelper";

function BlockCard({ blockData, selected, genesisState }) {
	const dispatch = useContext(BlockchainDispatch);
	const cursorStyle = genesisState ? null : { cursor: "pointer" };

	const handleSelectedBlock = async () => {
		const block = { ...blockData, transactions: await EventsFinder(blockData.transactions, "blockchain") };
		dispatch({ type: "UPDATE SELECTED BLOCK", block });
	};

	return (
		<Row className="">
			{/* For md, lg, xl and up screens */}
			<Col className="d-none d-md-block d-xl-block">
				<a
					style={cursorStyle}
					onClick={() => {
						if (!genesisState) handleSelectedBlock();
					}}
				>
					<Card border={selected ? "secondary" : null} className="">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col md={1}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										ID
									</h4>
								</Col>
								<Col md={5} lg={5} xl={7}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Hash
									</h4>
								</Col>
								<Col md={2} lg={2} xl={1} className="mx-0 px-0 text-center">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Transactions
									</h4>
								</Col>
								<Col md={2} lg={2} xl={1} className="mx-0 px-0 text-center">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Sent
									</h4>
								</Col>
								<Col md={1} lg={1} xl={1} className="mx-0 px-0 text-center">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Fees
									</h4>
								</Col>
								<Col md={1} lg={1} xl={1} className="mx-0 px-0 text-center">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Size
									</h4>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="">
							<Row className="align-items-center">
								<Col md={1}>
									<h1 className="my-0" style={{ fontSize: 18 }}>
										{blockData.index}
									</h1>
								</Col>
								<Col md={5} lg={5} xl={7}>
									<h1 className="my-0 truncate-hash" style={{ fontSize: 18 }}>
										{blockData.hash}
									</h1>
								</Col>
								<Col md={2} lg={2} xl={1} className="mx-0 px-0 text-center">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										{blockData.transactions.length}
									</h1>
								</Col>
								<Col md={2} lg={2} xl={1} className="mx-0 px-0 text-center">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										$
										{blockData.transactions.reduce((previous, current) => {
											return previous + current.amount;
										}, 0)}
									</h1>
								</Col>
								<Col md={1} lg={1} xl={1} className="mx-0 px-0 text-center">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										$
									</h1>
								</Col>
								<Col md={1} lg={1} xl={1} className="mx-0 px-0 text-center">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										Size
									</h1>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
			</Col>

			{/* For sm screen */}
			<Col className="mx-0 px-0 d-none d-sm-block d-md-none">
				<a
					style={{ cursor: "pointer" }}
					onClick={() => {
						handleSelectedBlock();
					}}
				>
					<Card border={selected ? "secondary" : null} className="">
						<Card.Header className="">
							<Row className="align-items-center">
								<Col xs={"auto"}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Hash
									</h4>
								</Col>
								<Col xs={10}>
									<h1 className="my-0 truncate-hash" style={{ fontSize: 18 }}>
										{blockData.hash}
									</h1>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="">
							<Row>
								<Col xs={1} className="">
									<Row className="align-items-center">
										<Col xs={"auto"} className="mr-0 pr-0">
											<h4 className="my-0" style={{ fontSize: 14 }}>
												ID
											</h4>
										</Col>
										<Col xs={2} className="mr-0 pr-0 ml-1 pl-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												{blockData.index}
											</h1>
										</Col>
									</Row>
								</Col>
								<Col xs={3}>
									<Row className="align-items-center">
										<Col xs={"auto"} className="mr-0 pr-0 ">
											<h4 className="my-0" style={{ fontSize: 14 }}>
												Transactions
											</h4>
										</Col>
										<Col xs={"auto"} className="mr-0 pr-0 ml-1 pl-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												{blockData.transactions.length}
											</h1>
										</Col>
									</Row>
								</Col>
								<Col xs={3}>
									<Row className="align-items-center">
										<Col xs={"auto"} className="mr-0 pr-0 ">
											<h4 className="my-0" style={{ fontSize: 14 }}>
												Sent
											</h4>
										</Col>
										<Col xs={"auto"} className="mr-0 pr-0 ml-1 pl-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												$
												{blockData.transactions.reduce((previous, current) => {
													return previous + current.amount;
												}, 0)}
											</h1>
										</Col>
									</Row>
								</Col>
								<Col xs={2}>
									<Row className="align-items-center">
										<Col xs={"auto"} className="mx-0 px-0 ">
											<h4 className="my-0" style={{ fontSize: 14 }}>
												Fees
											</h4>
										</Col>
										<Col xs={"auto"} className="mr-0 pr-0 ml-1 pl-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												$
											</h1>
										</Col>
									</Row>
								</Col>
								<Col xs={3}>
									<Row className="align-items-center">
										<Col xs={"auto"} className="mr-0 pr-0 ">
											<h4 className="my-0" style={{ fontSize: 14 }}>
												Size
											</h4>
										</Col>
										<Col xs={"auto"} className="mr-0 pr-0 ml-1 pl-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												Size
											</h1>
										</Col>
									</Row>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
			</Col>

			{/* For xs screen */}
			<Col className="mx-0 px-0 d-block d-sm-none">
				<a
					style={{ cursor: "pointer" }}
					onClick={() => {
						handleSelectedBlock();
					}}
				>
					<Card border={selected ? "secondary" : null} className="">
						<Card.Header className="">
							<Row className="align-items-center">
								<Col xs={"auto"}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Hash
									</h4>
								</Col>
								<Col xs={10}>
									<h1 className="my-0 truncate-hash" style={{ fontSize: 18 }}>
										{blockData.hash}
									</h1>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body className="">
							<Row className="justify-content-center">
								<Col xs={"auto"}>
									<Row className="align-items-center justify-content-center">
										<Col xs={"auto"} className="mr-1 pr-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												{blockData.index}
											</h1>
										</Col>
										<Col xs={"auto"} className="ml-0 pl-0">
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												{"ID"}
											</h4>
										</Col>
									</Row>
								</Col>
								<Col xs={"auto"}>
									<Row className="align-items-center justify-content-center">
										<Col xs={"auto"} className="mr-1 pr-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												{blockData.transactions.length}
											</h1>
										</Col>
										<Col xs={"auto"} className="ml-0 pl-0">
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												{"# of Transactions"}
											</h4>
										</Col>
									</Row>
								</Col>
								<Col xs={"auto"}>
									<Row className="align-items-center">
										<Col xs={"auto"} className="mr-1 pr-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												$
												{blockData.transactions.reduce((previous, current) => {
													return previous + current.amount;
												}, 0)}
											</h1>
										</Col>
										<Col xs={"auto"} className="ml-0 pl-0">
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												Sent
											</h4>
										</Col>
									</Row>
								</Col>
								<Col xs={"auto"}>
									<Row className="align-items-center justify-content-center">
										<Col xs={"auto"} className="mr-1 pr-1">
											<h1 className="my-0" style={{ fontSize: 18 }}>
												$
											</h1>
										</Col>
										<Col xs={"auto"} className="ml-0 pl-0">
											<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
												Fees
											</h4>
										</Col>
									</Row>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</a>
			</Col>
		</Row>
	);
}

export default BlockCard;
