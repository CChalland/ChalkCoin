import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BlockchainContext, BlockchainDispatch } from "../contexts/Blockchain.Context";
import { UserContext } from "../contexts/User.Context";
import axios from "axios";
import TransactionCard from "../components/Blockchain/TransactionCard";
import BlockCard from "../components/Blockchain/BlockCard";

function Blockchain() {
	const currentUser = useContext(UserContext);
	const blockchainData = useContext(BlockchainContext);
	const dispatch = useContext(BlockchainDispatch);
	const [pendingTransactions, setPendingTransactions] = useState(blockchainData.pendingTransactions);
	const [selectedBlock, setSelectedBlock] = useState(blockchainData.selectedBlock);
	const [mineState, setMineState] = useState(false);
	const blockchainBlocks = [
		...blockchainData.chain.slice(Math.max(blockchainData.chain.length - 5, 1)),
	].reverse();
	// const blockchainBlocks = [...blockchainData.chain].reverse();
	const handleMine = async () => {
		await axios
			.post(`http://192.168.4.27:3001/mine`, {
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
		if (pendingTransactions.length >= 10) setMineState(true);
		else setMineState(false);
	}, [pendingTransactions]);

	useEffect(() => {
		setSelectedBlock(blockchainData.selectedBlock);
	}, [blockchainData.selectedBlock]);

	// console.log("blockchainData", blockchainData);
	// console.log("pending transactions", pendingTransactions);
	// console.log("blockchain blocks", blockchainBlocks);
	// console.log("selectedBlock", selectedBlock);

	return (
		<Container fluid>
			<Row>
				<Col xs={12}>
					<Row className="align-items-center">
						<Col xs={"auto"}>
							<h2 className="my-2">Pending Transactions</h2>
						</Col>
						{mineState ? (
							<Col sm="auto" className="">
								<Row className="justify-content-start">
									<Col xs={"auto"}>
										<OverlayTrigger
											placement="bottom"
											overlay={<Tooltip>If your mine is completed, you'll receive tokens.</Tooltip>}
										>
											{({ ref, ...triggerHandler }) => (
												<Button
													variant="light"
													{...triggerHandler}
													className="btn-social btn-round btn-outline"
												>
													<i ref={ref} className="fas fa-exclamation"></i>
												</Button>
											)}
										</OverlayTrigger>
									</Col>
									<Col xs={"auto"}>
										<Button
											className="btn-wd align-items-center"
											type="button"
											variant="info"
											onClick={() => {
												handleMine();
											}}
										>
											<i className="nc-icon nc-atom mr-2"></i>
											Mine
										</Button>
									</Col>
								</Row>
							</Col>
						) : null}
					</Row>
					{pendingTransactions.map((transaction, key) => {
						return (
							<TransactionCard
								transactionData={transaction}
								userAddress={currentUser.walletAddress}
								key={key}
								panelKey={key}
							/>
						);
					})}
				</Col>
			</Row>

			<Row>
				<Col>
					<Row>
						<h2>Blockchain</h2>
					</Row>

					{blockchainBlocks.map((block, key) => {
						return (
							<BlockCard
								blockData={block}
								genesisState={block.hash === "0" ? true : false}
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
							<h2 className="my-0 truncate-hash">{selectedBlock.hash}</h2>
						</Col>
						<Col xs={"auto"} className="ml-0 pl-0">
							<h2 className="my-0">'s</h2>
						</Col>

						<Col xs={"auto"} className="mx-0 px-0"></Col>
						<h2 className="my-0">Transactions</h2>
					</Row>
					{selectedBlock.transactions?.map((transaction, key) => {
						return (
							<TransactionCard
								transactionData={transaction}
								userAddress={currentUser.walletAddress}
								key={key}
								panelKey={key}
							/>
						);
					})}
				</Col>
			</Row>
		</Container>
	);
}

export default Blockchain;
