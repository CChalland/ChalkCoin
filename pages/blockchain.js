import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getSession } from "next-auth/client";
import { BlockchainContext, BlockchainDispatch } from "../contexts/Blockchain.Context";
import TransactionCard from "../components/Blockchain/TransactionCard";
import BlockCard from "../components/Blockchain/BlockCard";

function Blockchain({ currentUser }) {
	const blockchainData = useContext(BlockchainContext);
	const [pendingTransactions, setPendingTransactions] = useState(blockchainData.pendingTransactions);
	const [recentBlocks, setRecentBlocks] = useState(blockchainData.selectedBlocks);
	const [blockTransactions, setBlockTransactions] = useState([]);

	const pendingTransCards = pendingTransactions.map((transaction, key) => {
		return <TransactionCard transactionData={transaction} key={key} panelKey={key} />;
	});
	const recentBlockCards = recentBlocks.map((block, key) => {
		return <BlockCard blockData={block} key={key} />;
	});
	const blockTransCards = blockTransactions.map((transaction, key) => {
		return (
			<Row key={`trans-row-${key}`}>
				<h5>transactions</h5>
			</Row>
		);
	});

	useEffect(() => {
		setPendingTransactions(blockchainData.pendingTransactions);
	}, [blockchainData.pendingTransactions]);

	console.log("blockchainData", blockchainData);
	// console.log("pending transactions", pendingTransactions);
	// console.log("recent blocks", recentBlocks);
	// console.log("blockchain - currentUser", currentUser);

	return (
		<Container fluid>
			<Row>
				<Col xs={12}>
					<Row className="align-items-center">
						<Col xs="auto">
							<h2>Pending Transactions</h2>
						</Col>
						<Col xs="auto">
							<Button className="btn-wd" type="button" variant="success" onClick={() => {}}>
								<span className="btn-label">
									<i className="fas fa-plus"></i>
								</span>
								Mine
							</Button>
						</Col>
					</Row>
					{pendingTransCards}
				</Col>
			</Row>

			<Row>
				<Col>
					<Row>
						<h2>Recent Blocks</h2>
					</Row>
					{recentBlockCards}
				</Col>
			</Row>

			<Row>
				<Col xs="auto">
					<Row className="">
						<h2>Block's Transactions</h2>
					</Row>
					{blockTransCards}
				</Col>
			</Row>
		</Container>
	);
}

export default Blockchain;
export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	let currentUser = {};
	if (session) {
		currentUser = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				requester: {
					select: { id: true },
				},
				accepter: {
					select: { id: true },
				},
				recipient: {
					select: { id: true },
				},
			},
		});
		delete currentUser.password;
		delete currentUser.paypal;
		delete currentUser.emailVerified;
		delete currentUser.createdAt;
		delete currentUser.updatedAt;
	}

	return {
		props: { currentUser },
	};
}
