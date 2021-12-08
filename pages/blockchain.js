import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BlockchainContext } from "../contexts/Blockchain.Context";
import { UserContext } from "../contexts/User.Context";
import PendingTransactions from "../components/Blockchain/PendingTransactions";
import Chain from "../components/Blockchain/Chain";
import SelectedBlock from "../components/Blockchain/SelectedBlock";
import Loading from "../components/Utility/Loading";

export default function Blockchain() {
	const currentUser = useContext(UserContext);
	const blockchainData = useContext(BlockchainContext);
	const [pendingTransactions, setPendingTransactions] = useState(blockchainData.pendingTransactions);
	const [pendingTransactionsState, setPendingTransactionsState] = useState(false);
	const [blocks, setBlocks] = useState([]);
	const [blocksState, setBlocksState] = useState(false);
	const [selectedBlock, setSelectedBlock] = useState(blockchainData.selectedBlock);
	const [selectedBlockState, setSelectedBlockState] = useState(false);
	// const blockchainBlocks = [
	// 	...blockchainData.chain.slice(Math.max(blockchainData.chain.length - 5, 1)),
	// ].reverse();

	useEffect(() => {
		setPendingTransactions(blockchainData.pendingTransactions);
		if (blockchainData.pendingTransactions.length > 0) setPendingTransactionsState(true);
	}, [blockchainData.pendingTransactions]);

	useEffect(() => {
		setBlocks([...blockchainData.chain].reverse());
		if (blockchainData.chain.length > 0) setBlocksState(true);
	}, [blockchainData.chain]);

	useEffect(() => {
		setSelectedBlock(blockchainData.selectedBlock);
		if (blockchainData.selectedBlock.hash) setSelectedBlockState(true);
	}, [blockchainData.selectedBlock]);

	// console.log("blockchainData", blockchainData);
	// console.log("pending transactions", pendingTransactions);
	// console.log("blockchain blocks", blockchainBlocks);
	// console.log("selectedBlock", selectedBlock);

	return (
		<Container fluid>
			{pendingTransactionsState ? (
				<PendingTransactions pendingTransactions={pendingTransactions} currentUser={currentUser} />
			) : (
				<Loading />
			)}
			{blocksState ? <Chain blocks={blocks} selectedBlock={selectedBlock} /> : <Loading />}
			{selectedBlockState ? (
				<SelectedBlock selectedBlock={selectedBlock} currentUser={currentUser} />
			) : (
				<Loading />
			)}
		</Container>
	);
}
