import { useContext, useEffect, useState } from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BlockchainDispatch } from "../../contexts/Blockchain.Context";
import { UserDispatch } from "../../contexts/User.Context";
import axios from "axios";
import TransactionCard from "./TransactionCard";
import Loading from "../Utility/Loading";

export default function PendingTransactions({ pendingTransactions, mineState, currentUser, loaded }) {
	const blockchainDispatch = useContext(BlockchainDispatch);
	const userDispatch = useContext(UserDispatch);
	const [disabledState, setDisabledState] = useState(true);

	const handleMine = async () => {
		await axios
			.post(`http://192.168.4.27:3001/mine`, {
				address: currentUser.walletAddress,
			})
			.then((res) => {
				if (res.data) {
					blockchainDispatch({
						type: "ADD BLOCK",
						block: res.data.block,
						mineTransaction: res.data.mineTransaction,
					});
					axios.post("/api/mineTransaction", res.data.mineTransaction).then((res) => {
						userDispatch({ type: "REWARD", balance: res.amount });
					});
				}
			});
	};

	useEffect(() => {
		if (currentUser.id) setDisabledState(false);
		else setDisabledState(true);
	}, [currentUser]);

	return loaded ? (
		<Row>
			<Col xs={12}>
				<Row className="align-items-center mt-4">
					<Col xs={"auto"}>
						<h2 className="mt-0 mb-1">Pending Transactions</h2>
					</Col>
					{mineState ? (
						<Col sm="auto" className="">
							<Row className="justify-content-start align-items-center">
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
									<OverlayTrigger
										show={disabledState}
										placement="top"
										overlay={
											<Tooltip id="tooltip-top">
												You have to be signned in to Mine. <strong>Please Signin</strong>.
											</Tooltip>
										}
									>
										<span className="d-inline-block" style={{ minWidth: "100%", minHeight: "100%" }}>
											<Button
												className="btn-wd align-items-center"
												disabled={disabledState}
												type="button"
												variant="info"
												onClick={() => {
													handleMine();
												}}
											>
												<i className="nc-icon nc-atom mr-2"></i>
												Mine
											</Button>
										</span>
									</OverlayTrigger>
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
	) : (
		<Loading />
	);
}
