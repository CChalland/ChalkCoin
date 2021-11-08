import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getSession } from "next-auth/client";
import { BlockchainContext, BlockchainDispatch } from "../contexts/Blockchain.Context";
import TransactionCard from "../components/Blockchain/TransactionCard";
import BlockCard from "../components/Blockchain/BlockCard";
import axios from "axios";

function Blockchain({ currentUser }) {
	const blockchainData = useContext(BlockchainContext);
	const dispatch = useContext(BlockchainDispatch);
	const [pendingTransactions, setPendingTransactions] = useState(blockchainData.pendingTransactions);
	const [selectedBlock, setSelectedBlock] = useState(blockchainData.selectedBlock);
	const blockchainBlocks = [...blockchainData.chain].reverse();
	const handleMine = async () => {
		await axios
			.post("http://localhost:3001/mine", {
				address: currentUser.walletAddress,
			})
			.then((res) => {
				console.log(res.data);
				dispatch({
					type: "ADD BLOCK",
					block: res.data.block,
					mineTransaction: res.data.mineTransaction,
				});
			});
	};

	useEffect(() => {
		setPendingTransactions(blockchainData.pendingTransactions);
	}, [blockchainData.pendingTransactions]);

	useEffect(() => {
		setSelectedBlock(blockchainData.selectedBlock);
	}, [blockchainData.selectedBlock]);

	console.log("blockchainData", blockchainData);
	// console.log("pending transactions", pendingTransactions);
	// console.log("recent blocks", blocks);
	// console.log("blockchain - currentUser", currentUser);

	return (
		<Container fluid>
			<Row>
				<Col xs={12}>
					<Row className="align-items-center">
						<Col xs="auto">
							<h2>Pending Transactions</h2>
						</Col>
						<Col xs="auto" className="mt-4">
							<Button
								className="btn-wd"
								type="button"
								variant="success"
								onClick={() => {
									handleMine();
								}}
							>
								<span className="btn-label">
									<i className="fas fa-plus"></i>
								</span>
								Mine
							</Button>
						</Col>
					</Row>
					{pendingTransactions.map((transaction, key) => {
						return <TransactionCard transactionData={transaction} key={key} panelKey={key} />;
					})}
				</Col>
			</Row>

			<Row>
				<Col>
					<Row>
						<h2>Recent Blocks</h2>
					</Row>
					{blockchainBlocks.map((block, key) => {
						return (
							<BlockCard
								blockData={block}
								selected={block.index === selectedBlock.index ? true : false}
								key={key}
							/>
						);
					})}
				</Col>
			</Row>

			<Row>
				<Col>
					<Row className="">
						<Col xs={5} md={3} lg={4} xl={2} className="mx-0 px-0">
							<h2 className="truncate-hash">{selectedBlock.hash}</h2>
						</Col>
						<Col xs={"auto"} className="mx-0 px-0"></Col>
						<h2>'s Transactions</h2>
					</Row>
					{selectedBlock.transactions?.map((transaction, key) => {
						return <TransactionCard transactionData={transaction} key={key} panelKey={key} />;
					})}
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
