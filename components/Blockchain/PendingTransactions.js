import { useContext, useEffect, useState } from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BlockchainDispatch } from "../../contexts/Blockchain.Context";
import axios from "axios";
import TransactionCard from "./TransactionCard";

export default function PendingTransactions({ pendingTransactions, currentUser }) {
	const dispatch = useContext(BlockchainDispatch);
	const [mineState, setMineState] = useState(false);
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
		if (pendingTransactions.length >= 10) setMineState(true);
		else setMineState(false);
	}, [pendingTransactions]);

	return (
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
				<div className="mx-0 px-0" style={{ overflowY: "auto", maxHeight: "500px" }}>
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
				</div>
			</Col>
		</Row>
	);
}
