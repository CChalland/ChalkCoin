import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BlockchainDispatch } from "../../contexts/Blockchain.Context";
import axios from "axios";
import TransactionCard from "../Blockchain/TransactionCard";

export default function PendingTransactions({ pendingTransactions, mineState, user }) {
	const dispatch = useContext(BlockchainDispatch);

	const handleMine = async () => {
		await axios
			.post(`http://192.168.4.27:3001/mine`, {
				address: user.walletAddress,
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

	console.log("pendingTransactions", pendingTransactions);

	return (
		<Container fluid className="mx-0 px-0">
			<Row className="align-items-center">
				<Col xs={"auto"}>
					<h1 className="mb-0" style={{ fontSize: 32 }}>
						Pending Transactions
					</h1>
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
										<Button variant="light" {...triggerHandler} className="btn-social btn-round btn-outline">
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

			<div className="mx-0 px-0" style={{ overflowY: "auto", maxHeight: "500px" }}>
				{pendingTransactions.map((transaction, key) => {
					return (
						<TransactionCard
							transactionData={transaction}
							userAddress={user.walletAddress}
							key={key}
							panelKey={key}
						/>
					);
				})}
			</div>
		</Container>
	);
}
