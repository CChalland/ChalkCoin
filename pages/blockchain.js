import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { BlockchainContext } from "../frontend/contexts/Blockchain.Context";
import { UserContext } from "../frontend/contexts/User.Context";
import PendingTransactions from "../frontend/components/Blockchain/PendingTransactions";
import Chain from "../frontend/components/Blockchain/Chain";
import SelectedBlock from "../frontend/components/Blockchain/SelectedBlock";

export default function Blockchain() {
	const currentUser = useContext(UserContext);
	const blockchain = useContext(BlockchainContext);
	const [pendingTransactions, setPendingTransactions] = useState(blockchain.pendingTransactions);
	const [pendingTransactionsState, setPendingTransactionsState] = useState(false);
	const [blocks, setBlocks] = useState([]);
	const [blocksState, setBlocksState] = useState(false);
	const [selectedBlock, setSelectedBlock] = useState(blockchain.selectedBlock);
	const [selectedBlockState, setSelectedBlockState] = useState(false);
	const [mineAlertState, setMineAlertState] = useState(false);
	const [mineState, setMineState] = useState(false);
	// const blockchainBlocks = [
	// 	...blockchain.chain.slice(Math.max(blockchain.chain.length - 5, 1)),
	// ].reverse();

	useEffect(() => {
		setPendingTransactions(blockchain.pendingTransactions);
	}, [blockchain.pendingTransactions]);

	useEffect(() => {
		if (blockchain.initialized) setPendingTransactionsState(true);
		if (pendingTransactions.length >= 10) {
			setMineAlertState(true);
			setMineState(true);
		} else {
			setMineAlertState(false);
			setMineState(false);
		}
	}, [pendingTransactions]);

	useEffect(() => {
		setBlocks([...blockchain.chain].reverse());
		if (blockchain.chain.length > 0) setBlocksState(true);
	}, [blockchain.chain]);

	useEffect(() => {
		setSelectedBlock(blockchain.selectedBlock);
		if (blockchain.selectedBlock.hash) setSelectedBlockState(true);
	}, [blockchain.selectedBlock]);

	let mineAlert = mineAlertState ? (
		<Alert className="alert-with-icon" variant="success">
			<button
				aria-hidden={true}
				className="close"
				data-dismiss="alert"
				type="button"
				onClick={() => {
					setMineAlertState(false);
				}}
			>
				<i className="nc-icon nc-simple-remove"></i>
			</button>
			<span data-notify="icon" className="nc-icon nc-bell-55"></span>
			<span data-notify="message">{"There's enough pending transactions to be mined."}</span>
		</Alert>
	) : null;

	// console.log("blockchain", blockchain);
	// console.log("pending transactions", pendingTransactions);
	// console.log("blockchain blocks", blockchainBlocks);
	// console.log("selectedBlock", selectedBlock);

	return (
		<Container fluid>
			<Row>
				<Col>{mineAlert}</Col>
			</Row>
			<PendingTransactions
				pendingTransactions={pendingTransactions}
				mineState={mineState}
				currentUser={currentUser}
				loaded={pendingTransactionsState}
			/>
			<Chain blocks={blocks} selectedBlock={selectedBlock} loaded={blocksState} />
			<SelectedBlock selectedBlock={selectedBlock} currentUser={currentUser} loaded={selectedBlockState} />
		</Container>
	);
}
