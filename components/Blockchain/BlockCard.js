import React, { useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { BlockchainDispatch } from "../../contexts/Blockchain.Context";
import { EventsFinder } from "../../helpers/BlockchainHelper";

function BlockCard({ blockData, selected }) {
	const dispatch = useContext(BlockchainDispatch);
	const handleSelectedBlock = async () => {
		const block = { ...blockData, transactions: await EventsFinder(blockData.transactions) };
		dispatch({ type: "UPDATE SELECTED BLOCK", block });
	};

	return (
		<Row className="">
			{/* For md, lg, xl and up screens */}
			<Col className="d-none d-md-block d-xl-block">
				<a
					style={{ cursor: "pointer" }}
					onClick={() => {
						handleSelectedBlock();
					}}
				>
					<Card border={selected ? "secondary" : null} className="">
						<Card.Header className="my-0 py-0">
							<Row className="align-items-center">
								<Col md={1}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Block ID
									</h4>
								</Col>
								<Col md={6}>
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Hash
									</h4>
								</Col>
								<Col md={1} className="mx-0 px-0">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										# of Transactions
									</h4>
								</Col>
								<Col md={2} className="mx-0 px-0">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Total $ Sent
									</h4>
								</Col>
								<Col md={1} className="mx-0 px-0">
									<h4 className="my-0 text-secondary" style={{ fontSize: 14 }}>
										Total $ Fees
									</h4>
								</Col>
								<Col md={1} className="mx-0 px-0">
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
								<Col md={6}>
									<h1 className="my-0" style={{ fontSize: 18 }}>
										{blockData.hash}
									</h1>
								</Col>
								<Col md={1} className="mx-0 px-0">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										{blockData.transactions.length}
									</h1>
								</Col>
								<Col md={2} className="mx-0 px-0">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										{blockData.transactions.reduce((previous, current) => {
											return previous + current.amount;
										}, 0)}
									</h1>
								</Col>
								<Col md={1} className="mx-0 px-0">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										Total $ Frees
									</h1>
								</Col>
								<Col md={1} className="mx-0 px-0">
									<h1 className="my-0" style={{ fontSize: 18 }}>
										Size
									</h1>
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
